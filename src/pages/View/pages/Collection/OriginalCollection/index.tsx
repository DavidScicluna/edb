import { FC, createContext, useState, lazy } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router';

import {
	TabsOnChangeProps,
	useTheme,
	useDebounce,
	Tabs,
	TabList,
	TabPanels,
	Skeleton
} from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useDispatch } from 'react-redux';

import collectionTabs, { moviesTabIndex, photosTabIndex } from '../common/data/tabs';
import ViewDummyPoster from '../../../components/ViewDummyPoster';
import { method as defaultOnSetActiveTab } from '../../../../../common/data/defaultPropValues';
import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { useMediaTypeImagesQuery, useMediaTypeQuery } from '../../../../../common/queries';
import Page from '../../../../../containers/Page';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import PageBody from '../../../../../containers/Page/components/PageBody';
import { ViewParams as CollectionParams } from '../../../common/types';
import { Suspense, TabIcon, TotalBadge } from '../../../../../components';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyPartsTab from '../components/DummyPartsTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import CollectionsDummyActions from '../components/CollectionsDummyActions';
import CollectionsDummyInfo from '../components/CollectionsDummyInfo';
import { guest, setUserRecentlyViewed } from '../../../../../store/slices/Users';
import { getUpdatedRecentlyViewedList } from '../../../../../common/utils/user';

import CollectionActions from './components/CollectionActions';
import { CollectionContext as CollectionContextType } from './types';
import CollectionInfo from './components/CollectionInfo';
import CollectionPoster from './components/CollectionPoster';

const OverviewTab = lazy(() => import('./components/OverviewTab'));
const PartsTab = lazy(() => import('./components/PartsTab'));
const PhotosTab = lazy(() => import('./components/PhotosTab'));

export const CollectionContext = createContext<CollectionContextType>({ onSetActiveTab: defaultOnSetActiveTab });

const Collection: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	const { id } = useParams<CollectionParams>();
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { id: userID, recentlyViewed } = useSelector((state) => state.users.data.activeUser.data);

	// TODO: Go over all useDebounce and check that we are actually using the debounced value not the state!
	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const collectionQuery = useMediaTypeQuery<'collection'>({
		props: { mediaType: 'collection', id: Number(id) },
		options: {
			onSuccess: (collection) => {
				if (userID !== guest.data.id) {
					dispatch(
						setUserRecentlyViewed({
							id: userID,
							data: getUpdatedRecentlyViewedList({
								recentlyViewed,
								mediaType: 'collection',
								mediaItem: collection
							})
						})
					);
				}
			}
		}
	});

	const { data: collection, isFetching: isCollectionFetching, isLoading: isCollectionLoading } = collectionQuery;
	const { parts = [] } = collection || {};

	const imagesQuery = useMediaTypeImagesQuery({
		props: { mediaType: 'collection', id: Number(id) },
		options: { enabled: !!collection?.id }
	});

	const { posters = [], backdrops = [] } = imagesQuery.data || {};

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = collectionTabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ ...location, ...tab.path });
		}
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = collectionTabs.findIndex(({ path }) => path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<CollectionContext.Provider
			value={{
				collectionQuery,
				imagesQuery,
				onSetActiveTab: handleTabChange
			}}
		>
			<Page>
				<PageHeader
					renderLeftPanel={
						!isSm && (isCollectionFetching || isCollectionLoading)
							? () => <ViewDummyPoster />
							: !isSm
							? () => <CollectionPoster collection={collection} />
							: undefined
					}
					renderTitle={(props) => (
						<Skeleton
							colorMode={colorMode}
							isLoaded={!!collection?.name && !(isCollectionFetching || isCollectionLoading)}
							variant='text'
						>
							<Text {...props}>{collection?.name}</Text>
						</Skeleton>
					)}
					renderSubtitle={
						isCollectionFetching || isCollectionLoading
							? () => <CollectionsDummyInfo />
							: collection
							? () => <CollectionInfo collection={collection} />
							: undefined
					}
					direction='row'
					spacing={spacing}
					p={spacing}
				/>
				{isSm && (isCollectionFetching || isCollectionLoading) ? (
					<ViewDummyPoster isFullWidth p={spacing} />
				) : isSm ? (
					<CollectionPoster collection={collection} isFullWidth p={spacing} />
				) : null}
				{!isGuest && (isCollectionFetching || isCollectionLoading) ? (
					<CollectionsDummyActions p={spacing} />
				) : !isGuest && collection ? (
					<CollectionActions collection={collection} p={spacing} />
				) : null}
				<PageBody px={spacing} pb={spacing}>
					<Tabs
						width='100%'
						height='100%'
						color={color}
						colorMode={colorMode}
						activeTab={activeTabDebounced}
						onChange={handleTabChange}
						size='xl'
					>
						<VStack width='100%' height='100%' spacing={spacing}>
							<TabList
								// TODO: Go over all View pages and add error handling ... meaning show errors if query fails
								tabs={collectionTabs.map((tab, index) => {
									return {
										label: tab.label,
										// isDisabled:
										renderLeft: tab.getIconProps
											? (props) => {
													return tab.getIconProps ? (
														<TabIcon
															{...tab.getIconProps({
																...props,
																isActive: activeTabDebounced === index
															})}
														/>
													) : undefined;
											  }
											: undefined,
										renderRight: tab.getTotalBadgeProps
											? (props) => {
													return tab.getTotalBadgeProps ? (
														<TotalBadge
															{...tab.getTotalBadgeProps({
																...props,
																total:
																	index === moviesTabIndex
																		? parts.length
																		: index === photosTabIndex
																		? posters.length + backdrops.length
																		: 0,
																isActive: activeTabDebounced === index
															})}
														/>
													) : undefined;
											  }
											: undefined
									};
								})}
							/>

							<TabPanels>
								<Suspense fallback={<DummyOverviewTab />}>
									<OverviewTab />
								</Suspense>

								<Suspense fallback={<DummyPartsTab />}>
									<PartsTab />
								</Suspense>

								<Suspense fallback={<DummyPhotosTab />}>
									<PhotosTab />
								</Suspense>
							</TabPanels>
						</VStack>
					</Tabs>
				</PageBody>
			</Page>
		</CollectionContext.Provider>
	);
};

export default Collection;
