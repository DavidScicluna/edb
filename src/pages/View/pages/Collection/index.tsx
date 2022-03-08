import { ReactElement, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useDisclosure, useConst, Text, Fade } from '@chakra-ui/react';

import axios from 'axios';
import _ from 'lodash';

import OverviewTab from './components/OverviewTab';
import PartsTab from './components/PartsTab';

import { useSelector } from '../../../../common/hooks';
import axiosInstance, { handleDelay } from '../../../../common/scripts/axios';
import { Images } from '../../../../common/types';
import { Collection as CollectionType } from '../../../../common/types/movie';
import { handleReturnBoringTypeByMediaType } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import MediaViewer from '../../../../components/MediaViewer';
import SkeletonText from '../../../../components/Skeleton/Text';
import Tabs from '../../../../components/Tabs';
import TabList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import { setRecentlyViewed } from '../../../../store/slices/User';
import Actions from '../../components/Actions';
import AssetsTab from '../../components/Assets';
import Structure from '../../components/Structure';
import Title from '../../components/Title';

const dummies = _.range(25, 75, 10);

const tabs = ['overview', 'parts', 'assets'];

const Collection = (): ReactElement => {
	const source = axios.CancelToken.source();

	const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

	const dispatch = useDispatch();
	const recentlyViewed = useSelector((state) => state.user.data.recentlyViewed);

	const color = useSelector((state) => state.user.ui.theme.color);

	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<number>(0);

	const [selectedPath, setSelectedPath] = useState<string>();

	const dummy = useConst<number>(_.sample(dummies) || 75);

	// Fetching collection
	const collectionQuery = useQuery(
		[`collection-${id}`, id],
		async () => {
			const { data } = await axiosInstance
				.get<CollectionType>(`/collection/${id}`, {
					cancelToken: source.token
				})
				.then((response) => handleDelay(2500, response));
			return data;
		},
		{
			onSuccess: (collection) => {
				dispatch(
					setRecentlyViewed({
						...recentlyViewed,
						collections: _.uniq([...recentlyViewed.collections, { ...collection }])
					})
				);
			}
		}
	);

	// Fetching collection images
	const imagesQuery = useQuery(
		[`collection-${id}-images`, id],
		async () => {
			const { data } = await axiosInstance.get<Images>(`/collection/${id}/images`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: collectionQuery.isSuccess }
	);

	const handleChangeTab = (index: number): void => {
		navigate({ pathname: '.', hash: tabs[index] });

		document.scrollingElement?.scrollTo(0, 0);
	};

	const handleOnAssetClick = (path: string): void => {
		setSelectedPath(path);
		onMediaViewerOpen();
	};

	const handleCheckLocation = (): void => {
		const hash = location.hash.replace('#', '');

		switch (hash) {
			case 'parts':
				setActiveTab(1);
				return;
			case 'assets':
				setActiveTab(2);
				return;
			default:
				setActiveTab(0);
				return;
		}
	};

	useEffect(() => {
		if (location.pathname === `/collections/${id}`) {
			handleCheckLocation();
		}
	}, [location.hash]);

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<>
			<Tabs activeTab={activeTab} onChange={handleChangeTab}>
				<Structure>
					{{
						title: (
							<Title
								mediaType='collection'
								renderTitle={({ color, fontSize, fontWeight }) => (
									<SkeletonText
										width={
											collectionQuery.isFetching || collectionQuery.isLoading
												? `${dummy}%`
												: 'auto'
										}
										fontSize={fontSize}
										isLoaded={!collectionQuery.isFetching || !collectionQuery.isLoading}
									>
										<Text
											align='left'
											color={color}
											fontSize={fontSize}
											fontWeight={fontWeight}
											whiteSpace={
												collectionQuery.isFetching || collectionQuery.isLoading
													? 'nowrap'
													: 'normal'
											}
										>
											{collectionQuery.data?.name || 'Collection Name'}
										</Text>
									</SkeletonText>
								)}
								isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
							/>
						),
						actions: (
							<Actions
								mediaItem={collectionQuery.data}
								mediaType='collection'
								title={collectionQuery.data?.name}
								isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
								isError={collectionQuery.isError}
							/>
						),
						tabList: (
							<TabList color={color}>
								{[
									{
										label: 'Overview'
									},
									{
										label: 'Parts',
										isDisabled:
											collectionQuery.isError ||
											collectionQuery.isFetching ||
											collectionQuery.isLoading ||
											(collectionQuery.data?.parts?.length || 0) === 0,
										renderRight:
											(collectionQuery.data?.parts?.length || 0) > 0
												? ({ isSelected, size }) => (
														<Fade in unmountOnExit>
															<Badge
																color={isSelected ? color : 'gray'}
																isLight={!isSelected}
																size={size}
															>
																<CountUp
																	duration={1}
																	end={collectionQuery.data?.parts?.length || 0}
																/>
															</Badge>
														</Fade>
												  )
												: undefined
									},
									{
										label: 'Assets',
										isDisabled:
											imagesQuery.isError ||
											imagesQuery.isFetching ||
											imagesQuery.isLoading ||
											(imagesQuery.data?.posters?.length || 0) +
												(imagesQuery.data?.backdrops?.length || 0) ===
												0,
										renderRight:
											(imagesQuery.data?.posters?.length || 0) +
												(imagesQuery.data?.backdrops?.length || 0) >
											0
												? ({ isSelected, size }) => (
														<Fade in unmountOnExit>
															<Badge
																color={isSelected ? color : 'gray'}
																isLight={!isSelected}
																size={size}
															>
																<CountUp
																	duration={1}
																	end={
																		(imagesQuery.data?.posters?.length || 0) +
																		(imagesQuery.data?.backdrops?.length || 0)
																	}
																/>
															</Badge>
														</Fade>
												  )
												: undefined
									}
								]}
							</TabList>
						),
						socials:
							activeTab === 1 ? (
								<Fade in unmountOnExit>
									<DisplayMode />
								</Fade>
							) : undefined,
						tabPanels: (
							<TabPanels>
								<OverviewTab
									collectionQuery={collectionQuery}
									imagesQuery={imagesQuery}
									onClickImage={handleOnAssetClick}
									onChangeTab={handleChangeTab}
								/>
								<PartsTab
									name={collectionQuery.data?.name || undefined}
									isError={collectionQuery.isError}
									isSuccess={collectionQuery.isSuccess}
									isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
									parts={collectionQuery.data?.parts || []}
								/>
								<AssetsTab
									alt={collectionQuery.data?.name}
									assets={{
										posters: imagesQuery.data?.posters,
										backdrops: imagesQuery.data?.backdrops
									}}
									isError={imagesQuery.isError}
									isSuccess={imagesQuery.isSuccess}
									isLoading={imagesQuery.isFetching || imagesQuery.isLoading}
									onClickAsset={handleOnAssetClick}
								/>
							</TabPanels>
						)
					}}
				</Structure>
			</Tabs>

			{imagesQuery.isSuccess ? (
				<MediaViewer
					alt={collectionQuery.data?.name || 'Collection Name'}
					assets={_.compact([
						(imagesQuery.data?.posters || []).length > 0
							? {
									label: 'Posters',
									mediaItems: (imagesQuery.data?.posters || []).map((image) => {
										return {
											type: 'image',
											boringType: handleReturnBoringTypeByMediaType('collection'),
											srcSize: ['w92', 'original'],
											data: { ...image }
										};
									})
							  }
							: undefined,
						(imagesQuery.data?.backdrops || []).length > 0
							? {
									label: 'Backdrops',
									mediaItems: (imagesQuery.data?.backdrops || []).map((image) => {
										return {
											type: 'image',
											boringType: handleReturnBoringTypeByMediaType('collection'),
											srcSize: ['w300', 'original'],
											data: { ...image }
										};
									})
							  }
							: undefined
					])}
					selectedPath={selectedPath}
					isOpen={isMediaViewerOpen}
					onClose={onMediaViewerClose}
				/>
			) : null}
		</>
	);
};

export default Collection;
