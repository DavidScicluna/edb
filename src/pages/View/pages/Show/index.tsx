import { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, useDisclosure, useConst, Fade } from '@chakra-ui/react';

import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery, useInfiniteQuery } from 'react-query';
import CountUp from 'react-countup';
import sort from 'array-sort';
import axios from 'axios';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';


import { useSelector } from '../../../../common/hooks';
import axiosInstance, { handleDelay } from '../../../../common/scripts/axios';
import { ExternalIDs, Images, Videos, Response, Review } from '../../../../common/types';
import { FullTV, Credits, PartialTV } from '../../../../common/types/tv';
import { handleReturnBoringTypeByMediaType } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import MediaViewer from '../../../../components/MediaViewer';
import { AssetType } from '../../../../components/MediaViewer/types';
import Socials from '../../../../components/Socials';
import Tabs from '../../../../components/Tabs';
import TabList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Page from '../../../../containers/Page';
import { defaultUser, getUser, guest, setUserRecentlyViewed } from '../../../../store/slices/Users';
import { UserReview } from '../../../../store/slices/Users/types';
import Actions from '../../components/Actions';
import AssetsTab from '../../components/Assets';
import CastCrewTab from '../../components/CastCrew';
import ReviewsTab from '../../components/Reviews';
import Structure from '../../components/Structure';
import VerticalPoster from '../../components/VerticalPoster';

import Title from './components/Title';
import SeasonsTab from './components/SeasonsTab';
import OverviewTab from './components/OverviewTab';

const tabs = ['overview', 'cast_crew', 'seasons', 'reviews', 'assets'];

const Show = (): ReactElement => {
	const source = axios.CancelToken.source();

	const [isMd] = useMediaQuery('(max-width: 960px)');

	const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const recentlyViewed = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.recentlyViewed || defaultUser.data.recentlyViewed
	);
	const userReviews = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.reviews?.user ||
			defaultUser.data.reviews?.user ||
			[]
	);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [selectedPath, setSelectedPath] = useState<string>();

	const [activeTab, setActiveTab] = useState<number>(0);

	const [reviews, setReviews] = useState<Response<Review[]>>();

	const tvShowUserReviews = useConst<UserReview[]>(
		userReviews.filter((review) => review.mediaItem.id === Number(id))
	);

	const isGuest = useConst<boolean>(guest.data.id === user);

	// Fetching tv show details
	const tvShowQuery = useQuery(
		[`tv-show-${id}`, id],
		async () => {
			const { data } = await axiosInstance
				.get<FullTV>(`/tv/${id}`, {
					params: { append_to_response: 'content_ratings' },
					cancelToken: source.token
				})
				.then((response) => handleDelay(2500, response));
			return data;
		},
		{
			onSuccess: (show) => {
				if (!(isNil(user) || isEmpty(user))) {
					dispatch(
						setUserRecentlyViewed({
							id: user || '',
							data: {
								...recentlyViewed,
								movies: recentlyViewed?.movies || [],
								tv: uniq([...(recentlyViewed?.tv || []), { ...show }]),
								people: recentlyViewed?.people || [],
								collections: recentlyViewed?.collections || []
							}
						})
					);
				}
			}
		}
	);

	// Fetching tv show credits
	const creditsQuery = useQuery(
		[`tv-show-${id}-credits`, id],
		async () => {
			const { data } = await axiosInstance.get<Credits>(`/tv/${id}/aggregate_credits`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: tvShowQuery.isSuccess }
	);

	// Fetching tv show external ids
	const externalIdsQuery = useQuery(
		[`tv-show-${id}-external_ids`, id],
		async () => {
			const { data } = await axiosInstance.get<ExternalIDs>(`/tv/${id}/external_ids`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: tvShowQuery.isSuccess }
	);

	// Fetching tv show images
	const imagesQuery = useQuery(
		[`tv-show-${id}-images`, id],
		async () => {
			const { data } = await axiosInstance.get<Images>(`/tv/${id}/images`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: tvShowQuery.isSuccess }
	);

	// Fetching tv show videos
	const videosQuery = useQuery(
		[`tv-show-${id}-videos`, id],
		async () => {
			const { data } = await axiosInstance.get<Videos>(`/tv/${id}/videos`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: tvShowQuery.isSuccess }
	);

	// Fetching tv reviews
	const reviewsQuery = useInfiniteQuery(
		[`tv-show-${id}-reviews`, id],
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance.get<Response<Review[]>>(`/tv/${id}/reviews`, {
				params: { page: pageParam },
				cancelToken: source.token
			});
			return data;
		},
		{
			enabled: tvShowQuery.isSuccess,
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
					results: sort([...uniqBy(reviews, 'id')], 'updated_at', { reverse: true }),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	);

	// Fetching tv show recommendations
	const recommendationsQuery = useQuery(
		[`tv-show-${id}-recommendations`, id],
		async () => {
			const { data } = await axiosInstance.get<Response<PartialTV[]>>(`/tv/${id}/recommendations`, {
				cancelToken: source.token
			});
			return sort([...(data.results || [])], 'popularity', { reverse: true }).filter(
				(_result, index) => index < 20
			);
		},
		{ enabled: tvShowQuery.isSuccess }
	);

	// Fetching similar tv shows
	const similarQuery = useQuery(
		[`tv-show-${id}-similar`, id],
		async () => {
			const { data } = await axiosInstance.get<Response<PartialTV[]>>(`/tv/${id}/similar`, {
				cancelToken: source.token
			});
			return sort([...(data.results || [])], 'popularity', { reverse: true }).filter(
				(_result, index) => index < 20
			);
		},
		{ enabled: tvShowQuery.isSuccess }
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
		const hash = location.hash.replace('#', '');

		switch (hash) {
			case 'cast':
			case 'crew':
			case 'cast_crew':
				setActiveTab(1);
				return;
			case 'seasons':
				setActiveTab(2);
				return;
			case 'reviews':
				setActiveTab(3);
				return;
			case 'assets':
				setActiveTab(4);
				return;
			default:
				setActiveTab(0);
				return;
		}
	};

	useEffect(() => {
		if (location.pathname === `/tvshows/${id}`) {
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
						<Title show={tvShowQuery.data} isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading} />
					}
				>
					{{
						renderLeftHeaderPanel:
							activeTab !== 0
								? (props) => (
										<VerticalPoster
											{...props}
											alt={tvShowQuery.data?.name || ''}
											path={tvShowQuery.data?.poster_path || ''}
											mediaType='tv'
											srcSize={['w92', 'original']}
											isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
											onClickPoster={handleMediaClick}
										/>
								  )
								: undefined,
						actions: !isGuest ? (
							<Actions
								mediaItem={tvShowQuery.data}
								mediaType='tv'
								title={tvShowQuery.data?.name}
								isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
								isError={tvShowQuery.isError}
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
													label: 'Cast & Crew',
													isDisabled:
														creditsQuery.isError ||
														creditsQuery.isFetching ||
														creditsQuery.isLoading,
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
													label: 'Seasons',
													isDisabled:
														tvShowQuery.isError ||
														tvShowQuery.isFetching ||
														tvShowQuery.isLoading,
													renderRight:
														(tvShowQuery.data?.number_of_seasons || 0) > 0
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
																					tvShowQuery.data
																						?.number_of_seasons || 0
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
														tvShowQuery.isError ||
														tvShowQuery.isFetching ||
														tvShowQuery.isLoading ||
														reviewsQuery.isError ||
														reviewsQuery.isFetching ||
														reviewsQuery.isLoading,
													renderRight:
														(reviews?.total_results || 0) +
															(tvShowUserReviews.length || 0) >
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
																					(reviews?.total_results || 0) +
																					(tvShowUserReviews.length || 0)
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
																					(imagesQuery.data?.posters
																						?.length || 0) +
																					(imagesQuery.data?.backdrops
																						?.length || 0) +
																					(videosQuery.data?.results
																						?.length || 0)
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
											alt={tvShowQuery.data?.name}
											socials={{
												...externalIdsQuery.data,
												homepage_id: tvShowQuery.data?.homepage
											}}
											orientation='horizontal'
											isLoading={
												tvShowQuery.isFetching ||
												tvShowQuery.isLoading ||
												externalIdsQuery.isFetching ||
												externalIdsQuery.isLoading
											}
										/>
									) : undefined,
									tabPanels: (
										<TabPanels>
											<OverviewTab
												tvShowQuery={tvShowQuery}
												creditsQuery={creditsQuery}
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
												alt={tvShowQuery.data?.name}
												credits={creditsQuery.data}
												isError={creditsQuery.isError}
												isSuccess={creditsQuery.isSuccess}
												isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
											/>
											<SeasonsTab
												show={tvShowQuery.data}
												isError={tvShowQuery.isError}
												isSuccess={tvShowQuery.isSuccess}
												isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
											/>
											<ReviewsTab
												alt={tvShowQuery.data?.name}
												mediaItem={tvShowQuery.data ? { ...tvShowQuery.data } : undefined}
												mediaType='tv'
												reviews={reviews}
												isError={reviewsQuery.isError}
												isSuccess={reviewsQuery.isSuccess}
												isLoading={reviewsQuery.isFetching || reviewsQuery.isLoading}
												hasNextPage={reviewsQuery.hasNextPage}
												onFetchNextPage={reviewsQuery.fetchNextPage}
											/>
											<AssetsTab
												alt={tvShowQuery.data?.name}
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
						)
					}}
				</Page>
			</Tabs>

			{imagesQuery.isSuccess || videosQuery.isSuccess ? (
				<MediaViewer
					alt={tvShowQuery.data?.name || 'TV Show Name'}
					assets={compact([
						(imagesQuery.data?.posters || []).length > 0
							? {
									label: 'Posters',
									mediaItems: (imagesQuery.data?.posters || []).map((image) => {
										return {
											type: 'image',
											boringType: handleReturnBoringTypeByMediaType('tv'),
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
											boringType: handleReturnBoringTypeByMediaType('tv'),
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
											boringType: handleReturnBoringTypeByMediaType('tv'),
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

export default Show;
