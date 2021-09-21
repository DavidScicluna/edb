import React, { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, useDisclosure, Tabs, TabPanels, TabPanel, ScaleFade, SlideFade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import axiosInstance from '../../common/scripts/axios';
import {
  Review,
  FullMovie,
  Credits,
  ExternalIDs,
  ImageResponse,
  VideoResponse,
  PartialMovie
} from '../../common/types/movie';
import { Response, Collection as CollectionType } from '../../common/types/types';
import MediaViewer from '../../components/MediaViewer';
import { MediaViewerType, MediaViewerProps } from '../../components/MediaViewer/types';
import Page from '../../containers/Page';
import Actions from './components/Actions';
import CastCrewTab from './components/CastCrewTab';
import HomeTab from './components/HomeTab';
import ReviewsTab from './components/ReviewsTab';
import TabList from './components/TabList';
import Title from './components/Title';

const Movie = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');
  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const { id } = useParams<{ id: string }>();

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

  // Fetching movie external ids
  const externalIdsQuery = useQuery([`movie-external_ids-${id}`, id], async () => {
    const { data } = await axiosInstance.get<ExternalIDs>(`/movie/${id}/external_ids`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie images
  const imagesQuery = useQuery([`movie-images-${id}`, id], async () => {
    const { data } = await axiosInstance.get<ImageResponse>(`/movie/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie videos
  const videosQuery = useQuery([`movie-videos-${id}`, id], async () => {
    const { data } = await axiosInstance.get<VideoResponse>(`/movie/${id}/videos`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie reviews
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
            title={movieQuery.data?.title}
            rating={{
              rating: movieQuery.data?.vote_average || null,
              count: movieQuery.data?.vote_count || null
            }}
            release_date={movieQuery.data?.release_date}
            certification={movieQuery.data?.release_dates.results.find((item) => item.iso_3166_1 === 'US')}
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
                title={movieQuery.data?.title}
                isLoading={movieQuery.isFetching || movieQuery.isLoading}
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
              />
            </ScaleFade>
          ),
          body: (
            <Tabs index={activeTab} onChange={(index: number) => setActiveTab(index)} variant='unstyled' p={2}>
              <TabList
                activeTab={activeTab}
                reviews={reviews?.total_results || 0}
                castCrew={(creditsQuery.data?.cast.length || 0) + (creditsQuery.data?.crew.length || 0)}
                isDisabled={{
                  credits: creditsQuery.isError || creditsQuery.isFetching || creditsQuery.isLoading,
                  reviews: (reviewsQuery.isError || reviewsQuery.isFetching || reviewsQuery.isLoading) && !reviews
                }}
              />
              <TabPanels>
                <TabPanel as={SlideFade} in={activeTab === 0} offsetY='15vh' p={0} unmountOnExit>
                  <HomeTab
                    movieQuery={movieQuery}
                    creditsQuery={creditsQuery}
                    imagesQuery={imagesQuery}
                    videosQuery={videosQuery}
                    collectionsQuery={collectionsQuery}
                    recommendationsQuery={recommendationsQuery}
                    onCoverClick={handleOnCoverClick}
                    onMediaClick={handleMediaClick}
                    onChangeTab={(index: number) => setActiveTab(index)}
                  />
                </TabPanel>
                <TabPanel as={SlideFade} in={activeTab === 1} offsetY='15vh' p={0} unmountOnExit>
                  <CastCrewTab
                    cast={creditsQuery.data?.cast}
                    crew={creditsQuery.data?.crew}
                    isError={creditsQuery.isError}
                    isSuccess={creditsQuery.isSuccess}
                    isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
                  />
                </TabPanel>
                <TabPanel as={SlideFade} in={activeTab === 2} offsetY='15vh' p={0} unmountOnExit>
                  <ReviewsTab
                    reviews={reviews}
                    isError={reviewsQuery.isError}
                    isSuccess={reviewsQuery.isSuccess}
                    isLoading={reviewsQuery.isFetching || reviewsQuery.isLoading}
                    hasNextPage={reviewsQuery.hasNextPage}
                    onFetchNextPage={reviewsQuery.fetchNextPage}
                  />
                </TabPanel>
              </TabPanels>
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
