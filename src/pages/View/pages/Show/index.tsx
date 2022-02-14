import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, Fade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import CountUp from 'react-countup';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
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
import { setRecentlyViewed } from '../../../../store/slices/User';
import Actions from '../../components/Actions';
import AssetsTab from '../../components/Assets';
import CastCrewTab from '../../components/CastCrew';
import ReviewsTab from '../../components/Reviews';
import Structure from '../../components/Structure';
import OverviewTab from './components/OverviewTab';
import SeasonsTab from './components/SeasonsTab';
import Title from './components/Title';

const Show = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const dispatch = useDispatch();
  const recentlyViewed = useSelector((state) => state.user.data.recentlyViewed);
  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const tvShowUserReviews = userReviews.filter((review) => review.mediaItem.id === Number(id));

  const color = useSelector((state) => state.user.ui.theme.color);

  const [selectedPath, setSelectedPath] = useState<string>();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [reviews, setReviews] = useState<Response<Review[]>>();

  // Fetching tv show details
  const tvShowQuery = useQuery(
    [`tv-show-${id}`, id],
    async () => {
      const { data } = await axiosInstance.get<FullTV>(`/tv/${id}`, {
        params: { append_to_response: 'content_ratings' },
        cancelToken: source.token
      });
      return data;
    },
    {
      onSuccess: (show) => {
        dispatch(
          setRecentlyViewed({
            ...recentlyViewed,
            tv: _.uniq([...recentlyViewed.tv, { ...show }])
          })
        );
      }
    }
  );

  // Fetching tv show credits
  const creditsQuery = useQuery([`tv-show-${id}-credits`, id], async () => {
    const { data } = await axiosInstance.get<Credits>(`/tv/${id}/aggregate_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show external ids
  const externalIdsQuery = useQuery([`tv-show-${id}-external_ids`, id], async () => {
    const { data } = await axiosInstance.get<ExternalIDs>(`/tv/${id}/external_ids`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show images
  const imagesQuery = useQuery([`tv-show-${id}-images`, id], async () => {
    const { data } = await axiosInstance.get<Images>(`/tv/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show videos
  const videosQuery = useQuery([`tv-show-${id}-videos`, id], async () => {
    const { data } = await axiosInstance.get<Videos>(`/tv/${id}/videos`, {
      cancelToken: source.token
    });
    return data;
  });

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
      }
    }
  );

  // Fetching tv show recommendations
  const recommendationsQuery = useQuery([`tv-show-${id}-recommendations`, id], async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>(`/tv/${id}/recommendations`, {
      cancelToken: source.token
    });
    return sort([...(data.results || [])], 'popularity', { reverse: true }).filter((_result, index) => index < 20);
  });

  // Fetching similar tv shows
  const similarQuery = useQuery([`tv-show-${id}-similar`, id], async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>(`/tv/${id}/similar`, {
      cancelToken: source.token
    });
    return sort([...(data.results || [])], 'popularity', { reverse: true }).filter((_result, index) => index < 20);
  });

  const handleChangeTab = (index: number): void => {
    setActiveTab(index);
    document.scrollingElement?.scrollTo(0, 0);
  };

  const handleMediaClick = (path: string): void => {
    setSelectedPath(path);
    onMediaViewerOpen();
  };

  const handleOnAssetClick = (path: string, type: AssetType): void => {
    switch (type) {
      case 'video': {
        const trailer = (videosQuery.data?.results || []).find((video) => video.official || video.type === 'Trailer');

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
      case 'castcrew':
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
            title: <Title show={tvShowQuery.data} isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading} />,
            actions: (
              <Actions
                mediaItem={tvShowQuery.data}
                mediaType='tv'
                title={tvShowQuery.data?.name}
                isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
                isError={tvShowQuery.isError}
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
                    label: 'Seasons',
                    isDisabled: tvShowQuery.isError || tvShowQuery.isFetching || tvShowQuery.isLoading,
                    renderRight:
                      (tvShowQuery.data?.number_of_seasons || 0) > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp duration={1} end={tvShowQuery.data?.number_of_seasons || 0} />
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
                      (reviews?.total_results || 0) + (tvShowUserReviews.length || 0) > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp
                                  duration={1}
                                  end={(reviews?.total_results || 0) + (tvShowUserReviews.length || 0)}
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
                alt={tvShowQuery.data?.name}
                socials={{ ...externalIdsQuery.data, homepage_id: tvShowQuery.data?.homepage }}
                orientation='horizontal'
                isLoading={
                  tvShowQuery.isFetching ||
                  tvShowQuery.isLoading ||
                  externalIdsQuery.isFetching ||
                  externalIdsQuery.isLoading
                }
              />
            ),
            tabPanels: (
              <TabPanels>
                <OverviewTab
                  tvShowQuery={tvShowQuery}
                  creditsQuery={creditsQuery}
                  recommendationsQuery={recommendationsQuery}
                  similarQuery={similarQuery}
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
                    imagesQuery.isFetching || imagesQuery.isLoading || videosQuery.isFetching || videosQuery.isLoading
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
          alt={tvShowQuery.data?.name || 'TV Show Name'}
          assets={[
            {
              label: 'Posters',
              mediaItems: (imagesQuery.data?.posters || []).map((image) => {
                return {
                  type: 'image',
                  boringType: handleReturnBoringTypeByMediaType('tv'),
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
                  boringType: handleReturnBoringTypeByMediaType('tv'),
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
                  boringType: handleReturnBoringTypeByMediaType('tv'),
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

export default Show;
