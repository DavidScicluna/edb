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
import ViewAlert from '../../../components/ViewAlert';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyReviewsTab from '../components/DummyReviewsTab';
import DummyCastTab from '../components/DummyCastTab';
import DummyCrewTab from '../components/DummyCrewTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import DummyVideosTab from '../components/DummyVideosTab';
import DummyMovieActions from '../components/DummyMovieActions';
import DummyMovieInfo from '../components/DummyMovieInfo';

import MovieActions from './components/MovieActions';
import { MovieContext as MovieContextType, MovieTabs, MovieParams } from './types';
import MovieInfo from './components/MovieInfo';
import MoviePoster from './components/MoviePoster';

const OverviewTab = lazy(() => import('./components/OverviewTab'));
const CastTab = lazy(() => import('./components/CastTab'));
const CrewTab = lazy(() => import('./components/CrewTab'));
const ReviewsTab = lazy(() => import('./components/ReviewsTab'));
const PhotosTab = lazy(() => import('./components/PhotosTab'));
const VideosTab = lazy(() => import('./components/VideosTab'));

export const MovieContext = createContext<MovieContextType>({ onSetActiveTab: defaultOnSetActiveTab });

export const movieTabs: MovieTabs = [
	{
		path: { hash: 'overview' },
		label: 'Overview'
	},
	{
		path: { hash: 'cast' },
		label: 'Cast',
		renderBadge: ({ color, isActive, ...rest }) => (
			<TotalBadge {...rest} color={isActive ? color : 'gray'} variant={isActive ? 'contained' : 'outlined'} />
		)
	},
	{
		path: { hash: 'crew' },
		label: 'Crew',
		renderBadge: ({ color, isActive, ...rest }) => (
			<TotalBadge {...rest} color={isActive ? color : 'gray'} variant={isActive ? 'contained' : 'outlined'} />
		)
	},
	{
		path: { hash: 'reviews' },
		label: 'Reviews',
		renderBadge: ({ color, isActive, ...rest }) => (
			<TotalBadge {...rest} color={isActive ? color : 'gray'} variant={isActive ? 'contained' : 'outlined'} />
		)
	},
	{
		path: { hash: 'photos' },
		label: 'Photos',
		renderBadge: ({ color, isActive, ...rest }) => (
			<TotalBadge {...rest} color={isActive ? color : 'gray'} variant={isActive ? 'contained' : 'outlined'} />
		)
	},
	{
		path: { hash: 'videos' },
		label: 'Videos',
		renderBadge: ({ color, isActive, ...rest }) => (
			<TotalBadge {...rest} color={isActive ? color : 'gray'} variant={isActive ? 'contained' : 'outlined'} />
		)
	}
];

const Movie: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	const { id } = useParams<MovieParams>();
	const location = useLocation();
	const navigate = useNavigate();

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
		config: { params: { append_to_response: 'release_dates' } }
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

	const collectionQuery = useMediaTypeQuery<'collection'>({
		props: { mediaType: 'collection', id: Number(movie?.belongs_to_collection?.id) },
		options: { enabled: !!movie?.belongs_to_collection?.id }
	});

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
		const index = movieTabs.findIndex((tab) => tab.path.hash === hash);

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
							: activeTabDebounced !== 0 && movie
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
							? () => <DummyMovieInfo />
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
					<DummyMovieActions p={spacing} />
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
										renderRight: (props) => {
											return tab.renderBadge
												? tab.renderBadge({
														...props,
														total:
															index === 1
																? castCredits.length
																: index === 2
																? crewCredits.length
																: index === 3
																? totalReviews
																: index === 4
																? posters.length + backdrops.length
																: index === 5
																? videos.length
																: 0,
														isActive: activeTabDebounced === index
												  })
												: undefined;
										}
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
