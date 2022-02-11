import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, Fade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import CountUp from 'react-countup';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';

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
import Actions from '../../components/Actions';
import AssetsTab from '../../components/Assets';
import CastCrewTab from '../../components/CastCrew';
import ReviewsTab from '../../components/Reviews';
import Structure from '../../components/Structure';
import OverviewTab from './components/OverviewTab';
import Title from './components/Title';

const Movie = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const color = useSelector((state) => state.user.ui.theme.color);

  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const movieUserReviews = userReviews.filter((review) => review.mediaItem.id === Number(id));

  const [selectedPath, setSelectedPath] = useState<string>();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [reviews, setReviews] = useState<Response<Review[]>>();

  // Fetching movie details
  const movieQuery = useQuery([`movie-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullMovie>(`/movie/${id}`, {
      params: { append_to_response: 'release_dates' },
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie credits
  const creditsQuery = useQuery([`movie-${id}-credits`, id], async () => {
    const { data } = await axiosInstance.get<Credits>(`/movie/${id}/credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie external ids
  const externalIdsQuery = useQuery([`movie-${id}-external_ids`, id], async () => {
    const { data } = await axiosInstance.get<ExternalIDs>(`/movie/${id}/external_ids`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie images
  const imagesQuery = useQuery([`movie-${id}-images`, id], async () => {
    const { data } = await axiosInstance.get<Images>(`/movie/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie videos
  const videosQuery = useQuery([`movie-${id}-videos`, id], async () => {
    const { data } = await axiosInstance.get<Videos>(`/movie/${id}/videos`, {
      cancelToken: source.token
    });
    return data;
  });

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
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false),
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
        return;
      }
    }
  );

  // Fetching movie recommendations
  const recommendationsQuery = useQuery([`movie-${id}-recommendations`, id], async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>(`/movie/${id}/recommendations`, {
      cancelToken: source.token
    });
    return sort([...(data.results || [])], 'popularity', { reverse: true }).filter((_result, index) => index < 20);
  });

  // Fetching similar movies
  const similarQuery = useQuery([`movie-${id}-similar`, id], async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>(`/movie/${id}/similar`, {
      cancelToken: source.token
    });
    return sort([...(data.results || [])], 'popularity', { reverse: true }).filter((_result, index) => index < 20);
  });

  const handleChangeTab = (index: number): void => {
    setActiveTab(index);
    document.scrollingElement?.scrollTo(0, 0);
  };

  /**
   * This method will open the image passed in the media modal
   *
   * @param image - Image object
   */
  const handleMediaClick = (path: string): void => {
    setSelectedPath(path);
    onMediaViewerOpen();
  };

  const handleOnCoverClick = (path: string, type: AssetType): void => {
    switch (type) {
      case 'video': {
        const trailer = (videosQuery.data?.results || []).find((image) => image.official || image.type === 'Trailer');

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

  useEffect(() => {
    handleCheckLocation();
  }, [location]);

  useEffect(() => {
    handleCheckLocation();

    return () => {
      source.cancel();

      setActiveTab(0);
    };
  }, []);

  return (
    <>
      <Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
        <Structure>
          {{
            title: <Title movie={movieQuery.data} isLoading={movieQuery.isFetching || movieQuery.isLoading} />,
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
                    isDisabled: creditsQuery.isError || creditsQuery.isFetching || creditsQuery.isLoading,
                    renderRight:
                      (creditsQuery.data?.cast?.length || 0) + (creditsQuery.data?.crew?.length || 0) > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp
                                  duration={1}
                                  end={(creditsQuery.data?.cast?.length || 0) + (creditsQuery.data?.crew?.length || 0)}
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
                      (creditsQuery.data?.cast?.length || 0) + (creditsQuery.data?.crew?.length || 0) > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp
                                  duration={1}
                                  end={(reviews?.total_results || 0) + (movieUserReviews.length || 0)}
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
                      videosQuery.isLoading,
                    renderRight:
                      (creditsQuery.data?.cast?.length || 0) + (creditsQuery.data?.crew?.length || 0) > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
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
            socials: (
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
            ),
            tabPanels: (
              <TabPanels>
                <OverviewTab
                  movieQuery={movieQuery}
                  creditsQuery={creditsQuery}
                  collectionQuery={collectionQuery}
                  recommendationsQuery={recommendationsQuery}
                  similarQuery={similarQuery}
                  imagesQuery={imagesQuery}
                  videosQuery={videosQuery}
                  onAssetClick={handleOnCoverClick}
                  onChangeTab={handleChangeTab}
                />
                <CastCrewTab
                  credits={creditsQuery.data}
                  isError={creditsQuery.isError}
                  isSuccess={creditsQuery.isSuccess}
                  isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
                />
                <ReviewsTab
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
                  images={{
                    posters: imagesQuery.data?.posters,
                    backdrops: imagesQuery.data?.backdrops
                  }}
                  videos={videosQuery.data?.results}
                  isError={{ images: imagesQuery.isError, videos: videosQuery.isError }}
                  isSuccess={{ images: imagesQuery.isSuccess, videos: videosQuery.isSuccess }}
                  isLoading={{
                    images: imagesQuery.isFetching || imagesQuery.isLoading,
                    videos: videosQuery.isFetching || videosQuery.isLoading
                  }}
                  onClickImage={() => console.log('asd')}
                />
              </TabPanels>
            )
          }}
        </Structure>
      </Tabs>

      {imagesQuery.isSuccess || videosQuery.isSuccess ? (
        <MediaViewer
          alt={movieQuery.data?.title ? `"${movieQuery.data.title}"` : 'Movie Title'}
          assets={[
            {
              label: 'Posters',
              mediaItems: (imagesQuery.data?.posters || []).map((image) => {
                return {
                  type: 'image',
                  boringType: handleReturnBoringTypeByMediaType('movie'),
                  srcSize: ['w92', 'original'],
                  data: { ...image }
                };
              })
            },
            {
              label: 'Backdrops',
              mediaItems: (imagesQuery.data?.backdrops || []).map((image) => {
                return {
                  type: 'image',
                  boringType: handleReturnBoringTypeByMediaType('movie'),
                  srcSize: ['w300', 'original'],
                  data: { ...image }
                };
              })
            },
            {
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
          ]}
          selectedPath={selectedPath}
          isOpen={isMediaViewerOpen}
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default Movie;
