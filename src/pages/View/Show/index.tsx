import React, { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, useDisclosure, VStack, ScaleFade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../../common/hooks';
import axiosInstance from '../../../common/scripts/axios';
import { Credits, Certifications, FullTV, PartialTV } from '../../../common/types/tv';
import { Response, Images, Videos, Review } from '../../../common/types/types';
import { handleReturnDate } from '../../../common/utils';
import MediaViewer from '../../../components/MediaViewer';
import { MediaViewerProps, MediaViewerType } from '../../../components/MediaViewer/types';
import Tabs from '../../../components/Tabs';
import TabList from '../../../components/Tabs/components/TabList';
import TabPanels from '../../../components/Tabs/components/TabPanels';
import Page from '../../../containers/Page';
import Actions from '../components/Actions';
import CastCrewTab from '../components/CastCrew';
import ReviewsTab from '../components/Reviews';
import Title from '../components/Title';
import HomeTab from './components/HomeTab';

const Show = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');
  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const { id } = useParams<{ id: string }>();

  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const tvShowUserReviews = userReviews.filter((review) => review.mediaItem.id === Number(id));

  console.log(userReviews);

  const [selectedAsset, setSelectedAsset] = useState<MediaViewerProps['selected']>();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [reviews, setReviews] = useState<Response<Review[]>>();

  // Fetching tv show details
  const tvShowQuery = useQuery([`tv-show-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullTV>(`/tv/${id}`, {
      // params: {
      //   append_to_response: 'release_dates'
      // },
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show aggregate credits
  const aggregateCreditsQuery = useQuery([`tv-show-aggregate_credits-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Credits>(`/tv/${id}/aggregate_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv credits
  // const creditsQuery = useQuery([`tv-credits-${id}`, id], async () => {
  //   const { data } = await axiosInstance.get<Credits>(`/tv/${id}/credits`, {
  //     cancelToken: source.token
  //   });
  //   return data;
  // });

  // Fetching tv external ids
  // const externalIdsQuery = useQuery([`tv-external_ids-${id}`, id], async () => {
  //   const { data } = await axiosInstance.get<ExternalIDs>(`/tv/${id}/external_ids`, {
  //     cancelToken: source.token
  //   });
  //   return data;
  // });

  // Fetching tv show certifications
  const certificationsQuery = useQuery([`tv-show-certifications-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Certifications>(`/tv/${id}/content_ratings`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show images
  const imagesQuery = useQuery([`tv-show-images-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Images>(`/tv/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show videos
  const videosQuery = useQuery([`tv-show-videos-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Videos>(`/tv/${id}/videos`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv reviews
  const reviewsQuery = useInfiniteQuery(
    [`tv-show-reviews-${id}`, id],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<Review[]>>(`/tv/${id}/reviews`, {
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

  // Fetching tv show recommendations
  const recommendationsQuery = useQuery([`tv-show-recommendations-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>(`/tv/${id}/recommendations`, {
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
            title={tvShowQuery.data?.name}
            rating={{
              rating: tvShowQuery.data?.vote_average || null,
              count: tvShowQuery.data?.vote_count || null
            }}
            date={
              !tvShowQuery.data?.in_production && tvShowQuery.data?.last_air_date
                ? `${handleReturnDate(tvShowQuery.data?.first_air_date || '', 'year')} - ${handleReturnDate(
                    tvShowQuery.data?.last_air_date || '',
                    'year'
                  )}`
                : `${handleReturnDate(tvShowQuery.data?.first_air_date || '', 'year')} - present`
            }
            certification={certificationsQuery.data?.results.find((item) => item.iso_3166_1 === 'US')?.rating}
            genres={tvShowQuery.data?.genres}
            runtime={
              tvShowQuery.data?.episode_run_time
                ? tvShowQuery.data.episode_run_time.reduce((a, b) => a + b, 0) /
                  tvShowQuery.data?.episode_run_time.length
                : undefined
            }
            isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
          />
        }
        breadcrumbs={[]}>
        {{
          actions: (
            <Actions
              mediaItem={
                tvShowQuery.data
                  ? {
                      poster_path: tvShowQuery.data.poster_path,
                      popularity: tvShowQuery.data.popularity,
                      id: tvShowQuery.data.id,
                      backdrop_path: tvShowQuery.data.backdrop_path,
                      vote_average: tvShowQuery.data.vote_average,
                      vote_count: tvShowQuery.data.vote_count,
                      overview: tvShowQuery.data.overview,
                      first_air_date: tvShowQuery.data.first_air_date,
                      origin_country: tvShowQuery.data.origin_country,
                      original_language: tvShowQuery.data.original_language,
                      original_name: tvShowQuery.data.original_name,
                      name: tvShowQuery.data.name,
                      genre_ids: tvShowQuery.data.genres.map((genre) => genre.id)
                    }
                  : undefined
              }
              mediaType='tv'
              title={tvShowQuery.data?.name}
              isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
              isError={tvShowQuery.isError}
            />
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
                      label: 'Series Cast & Crew',
                      isDisabled:
                        aggregateCreditsQuery.isError ||
                        aggregateCreditsQuery.isFetching ||
                        aggregateCreditsQuery.isLoading,
                      badge: String(
                        (aggregateCreditsQuery.data?.cast.length || 0) + (aggregateCreditsQuery.data?.crew.length || 0)
                      )
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
                      badge: String((reviews?.total_results || 0) + tvShowUserReviews.length)
                    }
                  ]}
                  activeTab={activeTab}
                />
                <TabPanels activeTab={activeTab}>
                  <HomeTab
                    tvShowQuery={tvShowQuery}
                    creditsQuery={aggregateCreditsQuery}
                    imagesQuery={imagesQuery}
                    videosQuery={videosQuery}
                    recommendationsQuery={recommendationsQuery}
                    onCoverClick={handleOnCoverClick}
                    onMediaClick={handleMediaClick}
                    onChangeTab={(index: number) => {
                      setActiveTab(index);
                      document.scrollingElement?.scrollTo(0, 0);
                    }}
                  />
                  <CastCrewTab
                    mediaType='tv'
                    cast={aggregateCreditsQuery.data?.cast}
                    crew={aggregateCreditsQuery.data?.crew}
                    isError={aggregateCreditsQuery.isError}
                    isSuccess={aggregateCreditsQuery.isSuccess}
                    isLoading={aggregateCreditsQuery.isFetching || aggregateCreditsQuery.isLoading}
                  />
                  <ReviewsTab
                    mediaItem={tvShowQuery.data ? { ...tvShowQuery.data } : undefined}
                    mediaType='tv'
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
          mediaType='tv'
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default Show;
