import { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, useDisclosure, ScaleFade, VStack } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../../common/hooks';
import axiosInstance from '../../../common/scripts/axios';
import { FullMovie, Credits, PartialMovie } from '../../../common/types/movie';
import { Response, Collection as CollectionType, Images, Videos, Review } from '../../../common/types/types';
import MediaViewer from '../../../components/MediaViewer';
import { MediaViewerType, MediaViewerProps } from '../../../components/MediaViewer/types';
import Tabs from '../../../components/Tabs';
import TabList from '../../../components/Tabs/components/TabList';
import TabPanels from '../../../components/Tabs/components/TabPanels';
import Page from '../../../containers/Page';
import Actions from '../components/Actions';
import Title from '../components/Title';
import CastCrewTab from './components/CastCrewTab';
import HomeTab from './components/HomeTab';
import ReviewsTab from './components/ReviewsTab';

const Movie = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');
  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const { id } = useParams<{ id: string }>();

  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const movieUserReviews = userReviews.filter((review) => review.mediaItem.id === Number(id));

  const [selectedAsset, setSelectedAsset] = useState<MediaViewerProps['selected']>();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [reviews, setReviews] = useState<Response<Review[]>>();

  // Fetching movie details
  const movieQuery = useQuery([`movie-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullMovie>(`/movie/${id}`, {
      params: {
        append_to_response: 'release_dates'
      },
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie credits
  const creditsQuery = useQuery([`movie-credits-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Credits>(`/movie/${id}/credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie images
  const imagesQuery = useQuery([`movie-images-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Images>(`/movie/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie videos
  const videosQuery = useQuery([`movie-videos-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Videos>(`/movie/${id}/videos`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie collections
  const collectionsQuery = useQuery(
    `movie-collections-${id}`,
    async () => {
      const { data } = await axiosInstance.get<CollectionType>(
        `/collection/${movieQuery.data?.belongs_to_collection.id}`,
        {
          cancelToken: source.token
        }
      );
      return data;
    },
    { enabled: movieQuery.isSuccess }
  );

  // Fetching movie reviews
  const reviewsQuery = useInfiniteQuery(
    [`movie-reviews-${id}`, id],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<Review[]>>(`/movie/${id}/reviews`, {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        let reviews: Review[] = [];

        data.pages.forEach((page) => {
          reviews = [...reviews, ...page.results];
        });

        setReviews({
          page: data.pages[data.pages.length - 1].page,
          results: sort(reviews, 'updated_at', { reverse: true }),
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
        return;
      }
    }
  );

  // Fetching movie recommendations
  const recommendationsQuery = useQuery([`movie-recommendations-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>(`/movie/${id}/recommendations`, {
      cancelToken: source.token
    });
    return data.results.filter((_result, index) => index < 20);
  });

  const handleMediaClick = (asset: string, type: MediaViewerType): void => {
    setSelectedAsset({ type, asset: asset });
    onMediaViewerOpen();
  };

  /**
   * This method will find the image object from images and then it will open the media modal
   *
   * @param path - Image path
   */
  const handleOnCoverClick = (path: string, type: MediaViewerType): void => {
    switch (type) {
      case 'video': {
        const trailer = videosQuery.data?.results.find((image) => image.official || image.type === 'Trailer');

        if (trailer) {
          handleMediaClick(trailer.key, 'video');
        }
        break;
      }
      default:
        handleMediaClick(path, type);
        break;
    }
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <Page
        title={
          <Title
            mediaType='movie'
            title={movieQuery.data?.title}
            rating={{
              rating: movieQuery.data?.vote_average || null,
              count: movieQuery.data?.vote_count || null
            }}
            date={movieQuery.data?.release_date}
            // certification={movieQuery.data?.release_dates.results.find((item) => item.iso_3166_1 === 'US')}
            genres={movieQuery.data?.genres}
            runtime={movieQuery.data?.runtime}
            isLoading={movieQuery.isFetching || movieQuery.isLoading}
          />
        }
        breadcrumbs={[]}>
        {{
          actions: (
            <ScaleFade in={!movieQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
              <Actions
                mediaItem={
                  movieQuery.data
                    ? {
                        adult: movieQuery.data.adult,
                        poster_path: movieQuery.data.poster_path,
                        overview: movieQuery.data.overview,
                        release_date: movieQuery.data.release_date,
                        id: movieQuery.data.id,
                        original_language: movieQuery.data.original_language,
                        original_title: movieQuery.data.original_title,
                        title: movieQuery.data.title,
                        backdrop_path: movieQuery.data.backdrop_path,
                        popularity: movieQuery.data.popularity,
                        video: movieQuery.data.video,
                        vote_average: movieQuery.data.vote_average,
                        vote_count: movieQuery.data.vote_count,
                        genre_ids: movieQuery.data.genres.map((genre) => genre.id)
                      }
                    : undefined
                }
                mediaType='movie'
                title={movieQuery.data?.title}
                isLoading={movieQuery.isFetching || movieQuery.isLoading}
              />
            </ScaleFade>
          ),
          body: (
            <Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
              <VStack alignItems='stretch' justifyContent='stretch' spacing={2} p={2}>
                <TabList
                  renderTabs={[
                    {
                      label: 'Overview'
                    },
                    {
                      label: 'Cast & Crew',
                      isDisabled: creditsQuery.isError || creditsQuery.isFetching || creditsQuery.isLoading,
                      badge: String((creditsQuery.data?.cast.length || 0) + (creditsQuery.data?.crew.length || 0))
                    },
                    {
                      label: 'Reviews',
                      isDisabled: reviewsQuery.isError || reviewsQuery.isFetching || reviewsQuery.isLoading,
                      badge: String(reviews?.total_results || 0 + movieUserReviews.length)
                    }
                  ]}
                  activeTab={activeTab}
                />
                <TabPanels activeTab={activeTab}>
                  <HomeTab
                    movieQuery={movieQuery}
                    creditsQuery={creditsQuery}
                    imagesQuery={imagesQuery}
                    videosQuery={videosQuery}
                    collectionsQuery={collectionsQuery}
                    recommendationsQuery={recommendationsQuery}
                    onCoverClick={handleOnCoverClick}
                    onMediaClick={handleMediaClick}
                    onChangeTab={(index: number) => {
                      setActiveTab(index);
                      document.scrollingElement?.scrollTo(0, 0);
                    }}
                  />
                  <CastCrewTab
                    cast={creditsQuery.data?.cast}
                    crew={creditsQuery.data?.crew}
                    isError={creditsQuery.isError}
                    isSuccess={creditsQuery.isSuccess}
                    isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
                  />
                  <ReviewsTab
                    movie={movieQuery.data}
                    reviews={reviews}
                    isError={reviewsQuery.isError}
                    isSuccess={reviewsQuery.isSuccess}
                    isLoading={reviewsQuery.isFetching || reviewsQuery.isLoading}
                    hasNextPage={reviewsQuery.hasNextPage}
                    onFetchNextPage={reviewsQuery.fetchNextPage}
                  />
                </TabPanels>
              </VStack>
            </Tabs>
          )
        }}
      </Page>

      {imagesQuery.isSuccess || videosQuery.isSuccess ? (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          selected={selectedAsset}
          photos={[...(imagesQuery.data?.posters || [])]}
          backdrops={[...(imagesQuery.data?.backdrops || [])]}
          videos={[...(videosQuery.data?.results.filter((video) => video.site === 'YouTube') || [])]}
          mediaType='movie'
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default Movie;
