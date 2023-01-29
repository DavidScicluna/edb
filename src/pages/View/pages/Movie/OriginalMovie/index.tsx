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
import { useDispatch } from 'react-redux';

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
import ViewAlert from '../../../components/ViewAlert';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyReviewsTab from '../components/DummyReviewsTab';
import DummyCastTab from '../components/DummyCastTab';
import DummyCrewTab from '../components/DummyCrewTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import DummyVideosTab from '../components/DummyVideosTab';
import MoviesDummyActions from '../components/MoviesDummyActions';
import MoviesDummyInfo from '../components/MoviesDummyInfo';
import { ViewParams as MovieParams } from '../../../common/types';
import movieTabs, {
	castTabIndex,
	crewTabIndex,
	reviewsTabIndex,
	photosTabIndex,
	videosTabIndex
} from '../common/data/tabs';
import { guest, setUserRecentlyViewed } from '../../../../../store/slices/Users';
import { getUpdatedRecentlyViewedList } from '../../../../../common/utils/user';

import MovieActions from './components/MovieActions';
import { MovieContext as MovieContextType } from './types';
import MovieInfo from './components/MovieInfo';
import MoviePoster from './components/MoviePoster';

const OverviewTab = lazy(() => import('./components/OverviewTab'));
const CastTab = lazy(() => import('./components/CastTab'));
const CrewTab = lazy(() => import('./components/CrewTab'));
const ReviewsTab = lazy(() => import('./components/ReviewsTab'));
const PhotosTab = lazy(() => import('./components/PhotosTab'));
const VideosTab = lazy(() => import('./components/VideosTab'));

export const MovieContext = createContext<MovieContextType>({ onSetActiveTab: defaultOnSetActiveTab });

const Movie: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	const { id } = useParams<MovieParams>();
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { id: userID, recentlyViewed } = useSelector((state) => state.users.data.activeUser.data);

	const userReviews = useSelector(
		(state) =>
			state.users.data.activeUser.data.reviews.user.movie.find(({ mediaItem }) => mediaItem?.id === id)?.reviews
				.length || 0
	);

	// TODO: Go over all useDebounce and check that we are actually using the debounced value not the state!
	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const movieQuery = useMediaTypeQuery<'movie'>({
		props: { mediaType: 'movie', id: Number(id) },
		config: { params: { append_to_response: 'release_dates' } },
		options: {
			onSuccess: (movie) => {
				if (userID !== guest.data.id) {
					dispatch(
						setUserRecentlyViewed({
							id: userID,
							data: getUpdatedRecentlyViewedList({
								recentlyViewed,
								mediaType: 'movie',
								mediaItem: movie
							})
						})
					);
				}
			}
		}
	});

	const { data: movie, isFetching: isMovieFetching, isLoading: isMovieLoading } = movieQuery;

	const creditsQuery = useMediaTypeCreditsQuery<'movie'>({
		props: { mediaType: 'movie', id: Number(id) },
		options: { enabled: !!movie?.id }
	});

	const { data: credits } = creditsQuery;
	const { cast: castCredits = [], crew: crewCredits = [] } = credits || {};

	const {
		data: externalIDs,
		isFetching: isExternalIDsFetching,
		isLoading: isExternalIDsLoading
	} = useExternalIDsQuery({
		props: { mediaType: 'movie', id: Number(id) },
		options: { enabled: !!movie?.id }
	});

	const imagesQuery = useMediaTypeImagesQuery({
		props: { mediaType: 'movie', id: Number(id) },
		options: { enabled: !!movie?.id }
	});

	const { posters = [], backdrops = [] } = imagesQuery.data || {};

	const videosQuery = useMediaTypeVideosQuery({
		props: { mediaType: 'movie', id: Number(id) },
		options: { enabled: !!movie?.id }
	});

	const { results: videos = [] } = videosQuery.data || {};

	const reviewsQuery = useMediaTypeReviewsInfiniteQuery({
		props: { mediaType: 'movie', id: Number(id) },
		options: { enabled: !!movie?.id }
	});

	const { pages: reviews = [] } = reviewsQuery.data || {};

	const [totalReviews, setTotalReviews] = useState<number>(userReviews);

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = movieTabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ ...location, ...tab.path });
		}
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = movieTabs.findIndex(({ path }) => path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	useEffect(() => {
		setTotalReviews(userReviews + reviews.reduce((total: number, { results = [] }) => total + results.length, 0));
	}, [userReviews, reviews]);

	return (
		<MovieContext.Provider
			value={{
				movieQuery,
				creditsQuery,
				reviewsQuery,
				imagesQuery,
				videosQuery,
				onSetActiveTab: handleTabChange
			}}
		>
			<Page>
				{movie &&
					movie.title &&
					movie.release_date &&
					dayjs(dayjs(movie.release_date)).isAfter(dayjs(new Date())) && (
						<ViewAlert mediaType='movie' title={movie.title} date={movie.release_date} />
					)}
				<PageHeader
					renderLeftPanel={
						activeTabDebounced !== 0 && (isMovieFetching || isMovieLoading)
							? () => <ViewDummyPoster />
							: activeTabDebounced !== 0
							? () => <MoviePoster movie={movie} />
							: undefined
					}
					renderTitle={(props) => (
						<Skeleton
							colorMode={colorMode}
							isLoaded={!!movie?.title && !(isMovieFetching || isMovieLoading)}
							variant='text'
						>
							<Text {...props}>{movie?.title}</Text>
						</Skeleton>
					)}
					renderSubtitle={
						isMovieFetching || isMovieLoading
							? () => <MoviesDummyInfo />
							: movie
							? () => <MovieInfo movie={movie} />
							: undefined
					}
					actions={
						isMovieFetching || isMovieLoading ? (
							<ViewDummyRating />
						) : movie && movie.vote_average ? (
							<ViewRating rating={movie.vote_average} count={movie.vote_count} />
						) : undefined
					}
					direction='row'
					spacing={spacing}
					p={spacing}
				/>
				{!isGuest && (isMovieFetching || isMovieLoading) ? (
					<MoviesDummyActions p={spacing} />
				) : !isGuest && movie ? (
					<MovieActions movie={movie} p={spacing} />
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
								tabs={movieTabs.map((tab, index) => {
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
													socials={{ ...externalIDs, homepage_id: movie?.homepage }}
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
		</MovieContext.Provider>
	);
};

export default Movie;
