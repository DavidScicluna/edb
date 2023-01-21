import { FC, createContext, useState, useEffect, lazy } from 'react';

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
import { keys, pick } from 'lodash';
import dayjs from 'dayjs';

import ViewDummyPoster from '../../../components/ViewDummyPoster';
import { method as defaultOnSetActiveTab } from '../../../../../common/data/defaultPropValues';
import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import {
	useExternalIDsQuery,
	useMediaTypeImagesQuery,
	useMediaTypeCreditsQuery,
	useMediaTypeQuery,
	useMediaTypeReviewsInfiniteQuery,
	useMediaTypeVideosQuery
} from '../../../../../common/queries';
import Page from '../../../../../containers/Page';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import PageBody from '../../../../../containers/Page/components/PageBody';
import ViewDummySocials from '../../../components/ViewDummySocials';
import ViewSocials from '../../../components/ViewSocials';
import { Suspense, TotalBadge } from '../../../../../components';
import ViewRating from '../../../components/ViewRating';
import ViewDummyRating from '../../../components/ViewDummyRating';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyReviewsTab from '../components/DummyReviewsTab';
import DummyCastTab from '../components/DummyCastTab';
import DummyCrewTab from '../components/DummyCrewTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import DummyVideosTab from '../components/DummyVideosTab';
import DummyEpisodesTab from '../components/DummyEpisodesTab';
import DummySeasonsTab from '../components/DummySeasonsTab';
import TVShowsDummyActions from '../components/TVShowsDummyActions';
import TVShowsDummyInfo from '../components/TVShowsDummyInfo';
import { ViewParams as TVShowParams } from '../../../common/types';
import showTabs, {
	castTabIndex,
	crewTabIndex,
	seasonsTabIndex,
	episodesTabIndex,
	reviewsTabIndex,
	photosTabIndex,
	videosTabIndex
} from '../common/data/tabs';
import ViewAlert from '../../../components/ViewAlert';

import TVShowActions from './components/TVShowActions';
import { TVShowContext as TVShowContextType } from './types';
import TVShowInfo from './components/TVShowInfo';
import TVShowPoster from './components/TVShowPoster';

const OverviewTab = lazy(() => import('./components/OverviewTab'));
const CastTab = lazy(() => import('./components/CastTab'));
const CrewTab = lazy(() => import('./components/CrewTab'));
const ReviewsTab = lazy(() => import('./components/ReviewsTab'));
const PhotosTab = lazy(() => import('./components/PhotosTab'));
const VideosTab = lazy(() => import('./components/VideosTab'));
const SeasonsTab = lazy(() => import('./components/SeasonsTab'));
const EpisodesTab = lazy(() => import('./components/EpisodesTab'));

export const TVShowContext = createContext<TVShowContextType>({ onSetActiveTab: defaultOnSetActiveTab });

const TVShow: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	const { id } = useParams<TVShowParams>();
	const location = useLocation();
	const navigate = useNavigate();

	const userReviews = useSelector(
		(state) =>
			state.users.data.activeUser.data.reviews.user.tv.find(({ mediaItem }) => mediaItem?.id === id)?.reviews
				.length || 0
	);

	// TODO: Go over all useDebounce and check that we are actually using the debounced value not the state!
	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const showQuery = useMediaTypeQuery<'tv'>({
		props: { mediaType: 'tv', id: Number(id) },
		config: { params: { append_to_response: 'content_ratings' } }
	});

	const { data: show, isFetching: isTVShowFetching, isLoading: isTVShowLoading } = showQuery;
	const { seasons = [] } = show || {};

	const creditsQuery = useMediaTypeCreditsQuery<'tv'>({
		props: { mediaType: 'tv', id: Number(id), isAggregated: true },
		options: { enabled: !!show?.id }
	});

	const { data: credits } = creditsQuery;
	const { cast: castCredits = [], crew: crewCredits = [] } = credits || {};

	const {
		data: externalIDs,
		isFetching: isExternalIDsFetching,
		isLoading: isExternalIDsLoading
	} = useExternalIDsQuery({
		props: { mediaType: 'tv', id: Number(id) },
		options: { enabled: !!show?.id }
	});

	const imagesQuery = useMediaTypeImagesQuery({
		props: { mediaType: 'tv', id: Number(id) },
		options: { enabled: !!show?.id }
	});

	const { posters = [], backdrops = [] } = imagesQuery.data || {};

	const videosQuery = useMediaTypeVideosQuery({
		props: { mediaType: 'tv', id: Number(id) },
		options: { enabled: !!show?.id }
	});

	const { results: videos = [] } = videosQuery.data || {};

	const reviewsQuery = useMediaTypeReviewsInfiniteQuery({
		props: { mediaType: 'tv', id: Number(id) },
		options: { enabled: !!show?.id }
	});

	const { pages: reviews = [] } = reviewsQuery.data || {};

	const [totalEpisodes, setTotalEpisodes] = useState<number>(0);
	const [totalReviews, setTotalReviews] = useState<number>(0);

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = showTabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ ...location, ...tab.path });
		}
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = showTabs.findIndex(({ path }) => path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	useEffect(() => {
		setTotalEpisodes(seasons.reduce((total: number, { episode_count = 0 }) => total + episode_count, 0));
	}, [seasons]);

	useEffect(() => {
		setTotalReviews(userReviews + reviews.reduce((total: number, { results = [] }) => total + results.length, 0));
	}, [userReviews, reviews]);

	return (
		<TVShowContext.Provider
			value={{
				showQuery,
				creditsQuery,
				reviewsQuery,
				imagesQuery,
				videosQuery,
				onSetActiveTab: handleTabChange
			}}
		>
			<Page>
				{show &&
					show.name &&
					show.first_air_date &&
					dayjs(dayjs(show.first_air_date)).isAfter(dayjs(new Date())) && (
						<ViewAlert mediaType='tv' title={show.name} date={show.first_air_date} />
					)}
				<PageHeader
					renderLeftPanel={
						activeTabDebounced !== 0 && (isTVShowFetching || isTVShowLoading)
							? () => <ViewDummyPoster />
							: activeTabDebounced !== 0
							? () => <TVShowPoster show={show} />
							: undefined
					}
					renderTitle={(props) => (
						<Skeleton
							colorMode={colorMode}
							isLoaded={!!show?.name && !(isTVShowFetching || isTVShowLoading)}
							variant='text'
						>
							<Text {...props}>{show?.name}</Text>
						</Skeleton>
					)}
					renderSubtitle={
						isTVShowFetching || isTVShowLoading
							? () => <TVShowsDummyInfo />
							: show
							? () => <TVShowInfo show={show} />
							: undefined
					}
					actions={
						isTVShowFetching || isTVShowLoading ? (
							<ViewDummyRating />
						) : show && show.vote_average ? (
							<ViewRating rating={show.vote_average} count={show.vote_count} />
						) : undefined
					}
					direction='row'
					spacing={spacing}
					p={spacing}
				/>
				{!isGuest && (isTVShowFetching || isTVShowLoading) ? (
					<TVShowsDummyActions p={spacing} />
				) : !isGuest && show ? (
					<TVShowActions show={show} p={spacing} />
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
								tabs={showTabs.map((tab, index) => {
									return {
										label: tab.label,
										// isDisabled:
										renderRight: tab.getTotalBadgeProps
											? (props) => {
													return tab.getTotalBadgeProps ? (
														<TotalBadge
															{...tab.getTotalBadgeProps({
																...props,
																total:
																	index === castTabIndex
																		? castCredits.length
																		: index === crewTabIndex
																		? crewCredits.length
																		: index === seasonsTabIndex
																		? seasons.length
																		: index === episodesTabIndex
																		? totalEpisodes
																		: index === reviewsTabIndex
																		? totalReviews
																		: index === photosTabIndex
																		? posters.length + backdrops.length
																		: index === videosTabIndex
																		? videos.length
																		: 0,
																isActive: activeTabDebounced === index
															})}
														/>
													) : undefined;
											  }
											: undefined
									};
								})}
								renderRight={
									!isSm && (isExternalIDsFetching || isExternalIDsLoading)
										? () => <ViewDummySocials />
										: !isSm &&
										  keys(
												pick(externalIDs, [
													'facebook_id',
													'twitter_id',
													'instagram_id',
													'imdb_id'
												])
										  ).length > 0
										? () => (
												<ViewSocials
													socials={{ ...externalIDs, homepage_id: show?.homepage }}
												/>
										  )
										: undefined
								}
							/>

							<TabPanels>
								<Suspense fallback={<DummyOverviewTab />}>
									<OverviewTab />
								</Suspense>

								<Suspense fallback={<DummyCastTab />}>
									<CastTab />
								</Suspense>

								<Suspense fallback={<DummyCrewTab />}>
									<CrewTab />
								</Suspense>

								<Suspense fallback={<DummySeasonsTab />}>
									<SeasonsTab />
								</Suspense>

								<Suspense fallback={<DummyEpisodesTab />}>
									<EpisodesTab />
								</Suspense>

								<Suspense fallback={<DummyReviewsTab />}>
									<ReviewsTab />
								</Suspense>

								<Suspense fallback={<DummyPhotosTab />}>
									<PhotosTab />
								</Suspense>

								<Suspense fallback={<DummyVideosTab />}>
									<VideosTab />
								</Suspense>
							</TabPanels>
						</VStack>
					</Tabs>
				</PageBody>
			</Page>
		</TVShowContext.Provider>
	);
};

export default TVShow;
