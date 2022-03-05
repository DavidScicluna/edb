import { ReactElement, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useMediaQuery, useDisclosure, Fade } from '@chakra-ui/react';

import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';

import OverviewTab from './components/OverviewTab';
import Title from './components/Title';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
import { ExternalIDs, Images, Response, Review, Videos } from '../../../../common/types';
import { FullMovie, Credits, Collection, PartialMovie } from '../../../../common/types/movie';
import { handleReturnBoringTypeByMediaType } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import MediaViewer from '../../../../components/MediaViewer';
import { AssetType } from '../../../../components/MediaViewer/types';
import Socials from '../../../../components/Socials';
import Tabs from '../../../../components/Tabs';
import TabList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import { setRecentlyViewed } from '../../../../store/slices/User';
import Actions from '../../components/Actions';
import AssetsTab from '../../components/Assets';
import CastCrewTab from '../../components/CastCrew';
import ReviewsTab from '../../components/Reviews';
import Structure from '../../components/Structure';

const tabs = ['overview', 'cast_crew', 'reviews', 'assets'];

const Movie = (): ReactElement => {
	const source = axios.CancelToken.source();

	const [isMd] = useMediaQuery('(max-width: 960px)');

	const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const recentlyViewed = useSelector((state) => state.user.data.recentlyViewed);
	const userReviews = useSelector((state) => state.user.data.reviews.user);
	const movieUserReviews = userReviews.filter((review) => review.mediaItem.id === Number(id));

	const color = useSelector((state) => state.user.ui.theme.color);

	const [selectedPath, setSelectedPath] = useState<string>();

	const [activeTab, setActiveTab] = useState<number>(0);

	const [reviews, setReviews] = useState<Response<Review[]>>();

	// Fetching movie details
	const movieQuery = useQuery(
		[`movie-${id}`, id],
		async () => {
			const { data } = await axiosInstance.get<FullMovie>(`/movie/${id}`, {
				params: { append_to_response: 'release_dates' },
				cancelToken: source.token
			});
			return data;
		},
		{
			onSuccess: (movie) => {
				dispatch(
					setRecentlyViewed({
						...recentlyViewed,
						movies: _.uniq([...recentlyViewed.movies, { ...movie }])
					})
				);
			}
		}
	);

	// Fetching movie credits
	const creditsQuery = useQuery(
		[`movie-${id}-credits`, id],
		async () => {
			const { data } = await axiosInstance.get<Credits>(`/movie/${id}/credits`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: movieQuery.isSuccess || movieQuery.isError }
	);

	// Fetching movie external ids
	const externalIdsQuery = useQuery([`movie-${id}-external_ids`, id], async () => {
		const { data } = await axiosInstance.get<ExternalIDs>(`/movie/${id}/external_ids`, {
			cancelToken: source.token
		});
		return data;
	});

	// Fetching movie images
	const imagesQuery = useQuery(
		[`movie-${id}-images`, id],
		async () => {
			const { data } = await axiosInstance.get<Images>(`/movie/${id}/images`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: movieQuery.isSuccess || movieQuery.isError }
	);

	// Fetching movie videos
	const videosQuery = useQuery(
		[`movie-${id}-videos`, id],
		async () => {
			const { data } = await axiosInstance.get<Videos>(`/movie/${id}/videos`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: movieQuery.isSuccess || movieQuery.isError }
	);

	// Fetching movie collections
	const collectionQuery = useQuery(
		`movie-${id}-collection`,
		async () => {
			const { data } = await axiosInstance.get<Collection>(
				`/collection/${movieQuery.data?.belongs_to_collection?.id}`,
				{
					cancelToken: source.token
				}
			);
			return data;
		},
		{
			enabled: movieQuery.isSuccess && !_.isNil(movieQuery.data?.belongs_to_collection?.id)
		}
	);

	// Fetching movie reviews
	const reviewsQuery = useInfiniteQuery(
		[`movie-${id}-reviews`, id],
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance.get<Response<Review[]>>(`/movie/${id}/reviews`, {
				params: { page: pageParam },
				cancelToken: source.token
			});
			return data;
		},
		{
			enabled: movieQuery.isSuccess || movieQuery.isError,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				let reviews: Review[] = [];

				data.pages.forEach((page) => {
					reviews = [...reviews, ...(page?.results || [])];
				});

				setReviews({
					page: data.pages[data.pages.length - 1].page,
					results: sort([..._.uniqBy(reviews, 'id')], 'updated_at', { reverse: true }),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	);

	// Fetching movie recommendations
	const recommendationsQuery = useQuery(
		[`movie-${id}-recommendations`, id],
		async () => {
			const { data } = await axiosInstance.get<Response<PartialMovie[]>>(`/movie/${id}/recommendations`, {
				cancelToken: source.token
			});
			return sort([...(data.results || [])], 'popularity', { reverse: true }).filter(
				(_result, index) => index < 20
			);
		},
		{ enabled: movieQuery.isSuccess || movieQuery.isError }
	);

	// Fetching similar movies
	const similarQuery = useQuery(
		[`movie-${id}-similar`, id],
		async () => {
			const { data } = await axiosInstance.get<Response<PartialMovie[]>>(`/movie/${id}/similar`, {
				cancelToken: source.token
			});
			return sort([...(data.results || [])], 'popularity', { reverse: true }).filter(
				(_result, index) => index < 20
			);
		},
		{ enabled: movieQuery.isSuccess || movieQuery.isError }
	);

	const handleChangeTab = (index: number): void => {
		navigate({ pathname: '.', hash: tabs[index] });

		document.scrollingElement?.scrollTo(0, 0);
	};

	const handleMediaClick = (path: string): void => {
		setSelectedPath(path);
		onMediaViewerOpen();
	};

	const handleOnAssetClick = (path: string, type: AssetType): void => {
		switch (type) {
			case 'video': {
				const trailer = (videosQuery.data?.results || []).find(
					(video) => video.official || video.type === 'Trailer'
				);

				handleMediaClick(trailer?.key || path);
				break;
			}
			default:
				handleMediaClick(path);
				break;
		}
	};

	const handleCheckLocation = (): void => {
		const hash = String(location.hash).replace('#', '');

		switch (hash) {
			case 'cast':
			case 'crew':
			case 'cast_crew':
				setActiveTab(1);
				return;
			case 'reviews':
				setActiveTab(2);
				return;
			case 'assets':
				setActiveTab(3);
				return;
			default:
				setActiveTab(0);
				return;
		}
	};

	useEffect(() => {
		handleCheckLocation();
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
							<Title movie={movieQuery.data} isLoading={movieQuery.isFetching || movieQuery.isLoading} />
						),
						actions: (
							<Actions
								mediaItem={movieQuery.data}
								mediaType='movie'
								title={movieQuery.data?.title}
								isLoading={movieQuery.isFetching || movieQuery.isLoading}
								isError={movieQuery.isError}
							/>
						),
						tabList: (
							<TabList color={color}>
								{[
									{
										label: 'Overview'
									},
									{
										label: 'Cast & Crew',
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
																		(creditsQuery.data?.cast?.length || 0) +
																		(creditsQuery.data?.crew?.length || 0)
																	}
																/>
															</Badge>
														</Fade>
												  )
												: undefined
									},
									{
										label: 'Reviews',
										isDisabled:
											movieQuery.isError ||
											movieQuery.isFetching ||
											movieQuery.isLoading ||
											reviewsQuery.isError ||
											reviewsQuery.isFetching ||
											reviewsQuery.isLoading,
										renderRight:
											(reviews?.total_results || 0) + (movieUserReviews.length || 0) > 0
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
																		(reviews?.total_results || 0) +
																		(movieUserReviews.length || 0)
																	}
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
											videosQuery.isError ||
											videosQuery.isFetching ||
											videosQuery.isLoading ||
											(imagesQuery.data?.posters?.length || 0) +
												(imagesQuery.data?.backdrops?.length || 0) +
												(videosQuery.data?.results?.length || 0) ===
												0,
										renderRight:
											(imagesQuery.data?.posters?.length || 0) +
												(imagesQuery.data?.backdrops?.length || 0) +
												(videosQuery.data?.results?.length || 0) >
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
																		(imagesQuery.data?.backdrops?.length || 0) +
																		(videosQuery.data?.results?.length || 0)
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
								alt={movieQuery.data?.title}
								socials={{ ...externalIdsQuery.data, homepage_id: movieQuery.data?.homepage }}
								orientation='horizontal'
								isLoading={
									movieQuery.isFetching ||
									movieQuery.isLoading ||
									externalIdsQuery.isFetching ||
									externalIdsQuery.isLoading
								}
							/>
						) : undefined,
						tabPanels: (
							<TabPanels>
								<OverviewTab
									movieQuery={movieQuery}
									creditsQuery={creditsQuery}
									collectionQuery={collectionQuery}
									recommendationsQuery={recommendationsQuery}
									similarQuery={similarQuery}
									reviews={reviews}
									reviewsQuery={reviewsQuery}
									imagesQuery={imagesQuery}
									videosQuery={videosQuery}
									onAssetClick={handleOnAssetClick}
									onChangeTab={handleChangeTab}
								/>
								<CastCrewTab
									alt={movieQuery.data?.title}
									credits={creditsQuery.data}
									isError={creditsQuery.isError}
									isSuccess={creditsQuery.isSuccess}
									isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
								/>
								<ReviewsTab
									alt={movieQuery.data?.title}
									mediaItem={movieQuery.data ? { ...movieQuery.data } : undefined}
									mediaType='movie'
									reviews={reviews}
									isError={reviewsQuery.isError}
									isSuccess={reviewsQuery.isSuccess}
									isLoading={reviewsQuery.isFetching || reviewsQuery.isLoading}
									hasNextPage={reviewsQuery.hasNextPage}
									onFetchNextPage={reviewsQuery.fetchNextPage}
								/>
								<AssetsTab
									alt={movieQuery.data?.title}
									assets={{
										posters: imagesQuery.data?.posters,
										backdrops: imagesQuery.data?.backdrops,
										videos: videosQuery.data?.results
									}}
									isError={imagesQuery.isError || videosQuery.isError}
									isSuccess={imagesQuery.isSuccess || videosQuery.isSuccess}
									isLoading={
										imagesQuery.isFetching ||
										imagesQuery.isLoading ||
										videosQuery.isFetching ||
										videosQuery.isLoading
									}
									onClickAsset={handleOnAssetClick}
								/>
							</TabPanels>
						)
					}}
				</Structure>
			</Tabs>

			{imagesQuery.isSuccess || videosQuery.isSuccess ? (
				<MediaViewer
					alt={movieQuery.data?.title || 'Movie Title'}
					assets={_.compact([
						(imagesQuery.data?.posters || []).length > 0
							? {
									label: 'Posters',
									mediaItems: (imagesQuery.data?.posters || []).map((image) => {
										return {
											type: 'image',
											boringType: handleReturnBoringTypeByMediaType('movie'),
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
											boringType: handleReturnBoringTypeByMediaType('movie'),
											srcSize: ['w300', 'original'],
											data: { ...image }
										};
									})
							  }
							: undefined,
						(videosQuery.data?.results || []).length > 0
							? {
									label: 'Videos',
									mediaItems: (videosQuery.data?.results || []).map((video) => {
										return {
											type: 'video',
											boringType: handleReturnBoringTypeByMediaType('movie'),
											srcSize: ['', ''],
											data: { ...video }
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

export default Movie;
