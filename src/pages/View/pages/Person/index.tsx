import { ReactElement, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useMediaQuery, useDisclosure, useConst, Fade } from '@chakra-ui/react';

import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import uniq from 'lodash/uniq';

import { handleGetDepartments } from './common/utils';
import CreditsTab from './components/CreditsTab';
import OverviewTab from './components/OverviewTab';
import Title from './components/Title';

import Page from '../.../../../../../containers/Page';
import { useSelector } from '../../../../common/hooks';
import axiosInstance, { handleDelay } from '../../../../common/scripts/axios';
import { ExternalIDs, Images } from '../../../../common/types';
import { FullPerson, Credits as CreditsType, MovieCredits, TVCredits } from '../../../../common/types/person';
import { handleReturnBoringTypeByMediaType } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import MediaViewer from '../../../../components/MediaViewer';
import Socials from '../../../../components/Socials';
import Tabs from '../../../../components/Tabs';
import TabList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import { defaultUser, getUser, guest, setUserRecentlyViewed } from '../../../../store/slices/Users';
import Actions from '../../components/Actions';
import AssetsTab from '../../components/Assets';
import Structure from '../../components/Structure';
import VerticalPoster from '../../components/VerticalPoster';

const tabs = ['overview', 'credits', 'photos'];

const Person = (): ReactElement => {
	const source = axios.CancelToken.source();

	const [isMd] = useMediaQuery('(max-width: 960px)');

	const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const recentlyViewed = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.recentlyViewed || defaultUser.data.recentlyViewed
	);
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<number>(0);

	const [selectedPath, setSelectedPath] = useState<string>();

	const isGuest = useConst<boolean>(guest.data.id === user);

	// Fetching person details
	const personQuery = useQuery(
		[`person-${id}`, id],
		async () => {
			const { data } = await axiosInstance
				.get<FullPerson>(`/person/${id}`, {
					cancelToken: source.token
				})
				.then((response) => handleDelay(2500, response));
			return data;
		},
		{
			onSuccess: (person) => {
				if (!(isNil(user) || isEmpty(user))) {
					dispatch(
						setUserRecentlyViewed({
							id: user || '',
							data: {
								...recentlyViewed,
								movies: recentlyViewed?.movies || [],
								tv: recentlyViewed?.tv || [],
								people: uniq([...(recentlyViewed?.people || []), { ...person }]),
								collections: recentlyViewed?.collections || []
							}
						})
					);
				}
			}
		}
	);

	// Fetching person known for list
	const creditsQuery = useQuery(
		[`person-${id}-combined_credits`, id],
		async () => {
			const { data } = await axiosInstance.get<CreditsType>(`/person/${id}/combined_credits`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: personQuery.isSuccess }
	);

	// Fetching person movie credits
	const movieCreditsQuery = useQuery(
		[`person-${id}-movie_credits`, id],
		async () => {
			const { data } = await axiosInstance.get<MovieCredits>(`/person/${id}/movie_credits`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: personQuery.isSuccess }
	);

	// Fetching person tv credits
	const tvCreditsQuery = useQuery(
		[`person-${id}-tv_credits`, id],
		async () => {
			const { data } = await axiosInstance.get<TVCredits>(`/person/${id}/tv_credits`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: personQuery.isSuccess }
	);

	// Fetching person external ids
	const externalIdsQuery = useQuery(
		[`person-${id}-external_ids`, id],
		async () => {
			const { data } = await axiosInstance.get<ExternalIDs>(`/person/${id}/external_ids`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: personQuery.isSuccess }
	);

	// Fetching person images
	const imagesQuery = useQuery(
		[`person-${id}-images`, id],
		async () => {
			const { data } = await axiosInstance.get<Images>(`/person/${id}/images`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: personQuery.isSuccess }
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
			case 'credits':
				setActiveTab(1);
				return;
			case 'photos':
				setActiveTab(2);
				return;
			default:
				setActiveTab(0);
				return;
		}
	};

	const departments =
		movieCreditsQuery.isSuccess && tvCreditsQuery.isSuccess
			? handleGetDepartments(movieCreditsQuery.data, tvCreditsQuery.data)
			: [];

	useEffect(() => {
		if (location.pathname === `/people/${id}`) {
			handleCheckLocation();
		}
	}, [location.hash]);

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<>
			<Tabs activeTab={activeTab} onChange={handleChangeTab}>
				<Page
					title={
						<Title
							person={personQuery.data}
							departments={departments.map((department) => department.label)}
							isLoading={personQuery.isFetching || personQuery.isLoading}
						/>
					}
				>
					{{
						renderLeftHeaderPanel: (props) => (
							<VerticalPoster
								{...props}
								alt={personQuery.data?.name || ''}
								path={personQuery.data?.profile_path || ''}
								mediaType='person'
								srcSize={['w45', 'original']}
								isLoading={personQuery.isFetching || personQuery.isLoading}
								onClickPoster={handleOnAssetClick}
							/>
						),
						actions: !isGuest ? (
							<Actions
								mediaItem={personQuery.data}
								mediaType='person'
								title={personQuery.data?.name}
								isLoading={personQuery.isFetching || personQuery.isLoading}
								isError={personQuery.isError}
							/>
						) : undefined,
						body: (
							<Structure>
								{{
									tabList: (
										<TabList color={color}>
											{[
												{
													label: 'Overview'
												},
												{
													label: 'Credits',
													isDisabled:
														creditsQuery.isError ||
														creditsQuery.isFetching ||
														creditsQuery.isLoading ||
														(creditsQuery.data?.cast?.length || 0) +
															(creditsQuery.data?.crew?.length || 0) ===
															0,
													renderRight:
														(creditsQuery.data?.cast?.length || 0) +
															(creditsQuery.data?.crew?.length || 0) >
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
																					(creditsQuery.data?.cast?.length ||
																						0) +
																					(creditsQuery.data?.crew?.length ||
																						0)
																				}
																			/>
																		</Badge>
																	</Fade>
															  )
															: undefined
												},
												{
													label: 'Photos',
													isDisabled:
														imagesQuery.isError ||
														imagesQuery.isFetching ||
														imagesQuery.isLoading ||
														(imagesQuery.data?.profiles?.length || 0) === 0,
													renderRight:
														(imagesQuery.data?.profiles?.length || 0) > 0
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
																					imagesQuery.data?.profiles
																						?.length || 0
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
									socials: !isMd ? (
										<Socials
											alt={personQuery.data?.name}
											socials={{
												...externalIdsQuery.data,
												homepage_id: personQuery.data?.homepage
											}}
											orientation='horizontal'
											isLoading={
												personQuery.isFetching ||
												personQuery.isLoading ||
												externalIdsQuery.isFetching ||
												externalIdsQuery.isLoading
											}
										/>
									) : undefined,
									tabPanels: (
										<TabPanels>
											<OverviewTab
												person={personQuery.data}
												credits={creditsQuery.data}
												images={imagesQuery.data?.profiles}
												isError={{
													person: personQuery.isError,
													credits: creditsQuery.isError,
													images: imagesQuery.isError
												}}
												isSuccess={{
													person: personQuery.isSuccess,
													credits: creditsQuery.isSuccess,
													images: imagesQuery.isSuccess
												}}
												isLoading={{
													person: personQuery.isFetching || personQuery.isLoading,
													credits: creditsQuery.isFetching || creditsQuery.isLoading,
													images: imagesQuery.isFetching || imagesQuery.isLoading
												}}
												onClickImage={handleOnAssetClick}
												onChangeTab={handleChangeTab}
											/>
											<CreditsTab
												departments={departments}
												isError={movieCreditsQuery.isError || tvCreditsQuery.isError}
												isSuccess={movieCreditsQuery.isSuccess && tvCreditsQuery.isSuccess}
												isLoading={
													movieCreditsQuery.isFetching ||
													movieCreditsQuery.isLoading ||
													tvCreditsQuery.isFetching ||
													tvCreditsQuery.isLoading
												}
											/>
											<AssetsTab
												alt={personQuery.data?.name}
												assets={{ profiles: imagesQuery.data?.profiles }}
												isError={imagesQuery.isError}
												isSuccess={imagesQuery.isSuccess}
												isLoading={imagesQuery.isFetching || imagesQuery.isLoading}
												onClickAsset={handleOnAssetClick}
											/>
										</TabPanels>
									)
								}}
							</Structure>
						)
					}}
				</Page>
			</Tabs>

			{imagesQuery.isSuccess && (imagesQuery.data?.profiles || []).length > 0 ? (
				<MediaViewer
					alt={personQuery.data?.name || 'Person Name'}
					assets={[
						{
							label: 'Photos',
							mediaItems: (imagesQuery.data?.profiles || []).map((image) => {
								return {
									type: 'image',
									boringType: handleReturnBoringTypeByMediaType('person'),
									srcSize: ['w45', 'original'],
									data: { ...image }
								};
							})
						}
					]}
					selectedPath={selectedPath}
					isOpen={isMediaViewerOpen}
					onClose={onMediaViewerClose}
				/>
			) : null}
		</>
	);
};

export default Person;
