import React, { ReactElement, useState, useEffect } from 'react';

import { Fade } from '@chakra-ui/react';
import axios from 'axios';
import CountUp from 'react-countup';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
import { ExternalIDs, Images, Videos } from '../../../../common/types';
import { FullTV, Episode as EpisodeType, EpisodeCredits } from '../../../../common/types/tv';
import Badge from '../../../../components/Badge';
import Socials from '../../../../components/Socials';
import Tabs from '../../../../components/Tabs';
import TabList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import AssetsTab from '../../components/Assets';
import CastCrewTab from '../../components/CastCrew';
import Structure from '../../components/Structure';
import Actions from './components/Actions';
import OverviewTab from './components/OverviewTab';
import Title from './components/Title';

const Episode = (): ReactElement => {
  const source = axios.CancelToken.source();

  // const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { id, season, episode } = useParams<{ id: string; season: string; episode: string }>();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [selectedPath, setSelectedPath] = useState<string>();

  // Fetching tv show details
  const tvShowQuery = useQuery([`tv-show-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullTV>(`/tv/${id}`, {
      params: { append_to_response: 'content_ratings' },
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show episode details
  const episodeQuery = useQuery([`tv-show-${id}-season-${season}-episode-${episode}`, id], async () => {
    const { data } = await axiosInstance.get<EpisodeType>(`/tv/${id}/season/${season}/episode/${episode}`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show episode credits
  const creditsQuery = useQuery([`tv-show-${id}-season-${season}-episode-${episode}-credits`, id], async () => {
    const { data } = await axiosInstance.get<EpisodeCredits>(`/tv/${id}/season/${season}/episode/${episode}/credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show episode external ids
  const externalIdsQuery = useQuery(
    [`tv-show-${id}-season-${season}-episode-${episode}-external_ids`, id],
    async () => {
      const { data } = await axiosInstance.get<ExternalIDs>(
        `/tv/${id}/season/${season}/episode/${episode}/external_ids`,
        {
          cancelToken: source.token
        }
      );
      return data;
    }
  );

  // Fetching tv show episode images
  const imagesQuery = useQuery([`tv-show-${id}-season-${season}-episode-${episode}-images`, id], async () => {
    const { data } = await axiosInstance.get<Images>(`/tv/${id}/season/${season}/episode/${episode}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching tv show episode videos
  const videosQuery = useQuery([`tv-show-${id}-season-${season}-episode-${episode}-videos`, id], async () => {
    const { data } = await axiosInstance.get<Videos>(`/tv/${id}/season/${season}/episode/${episode}/videos`, {
      cancelToken: source.token
    });
    return data;
  });

  const handleChangeTab = (index: number): void => {
    setActiveTab(index);
    document.scrollingElement?.scrollTo(0, 0);
  };

  const handleOnAssetClick = (path: string): void => {
    setSelectedPath(path);
    // onMediaViewerOpen();
  };

  const handleCheckLocation = (): void => {
    const hash = String(location.hash).replace('#', '');

    switch (hash) {
      case 'cast':
      case 'guests':
      case 'crew':
      case 'castguestscrew':
        setActiveTab(1);
        return;
      case 'assets':
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
            title: (
              <Title
                show={tvShowQuery.data}
                episode={episodeQuery.data}
                isLoading={
                  tvShowQuery.isFetching || tvShowQuery.isLoading || episodeQuery.isFetching || episodeQuery.isLoading
                }
              />
            ),
            actions: (
              <Actions
                show={tvShowQuery.data}
                isLoading={
                  tvShowQuery.isFetching || tvShowQuery.isLoading || episodeQuery.isFetching || episodeQuery.isLoading
                }
              />
            ),
            tabList: (
              <TabList color={color}>
                {[
                  {
                    label: 'Overview'
                  },
                  {
                    label: 'Cast, Guest Stars & Crew',
                    isDisabled: creditsQuery.isError || creditsQuery.isFetching || creditsQuery.isLoading,
                    renderRight:
                      (creditsQuery.data?.cast?.length || 0) +
                        (creditsQuery.data?.guest_stars?.length || 0) +
                        (creditsQuery.data?.crew?.length || 0) >
                      0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp
                                  duration={1}
                                  end={
                                    (creditsQuery.data?.cast?.length || 0) +
                                    (creditsQuery.data?.guest_stars?.length || 0) +
                                    (creditsQuery.data?.crew?.length || 0)
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
                      (imagesQuery.data?.stills?.length || 0) + (videosQuery.data?.results?.length || 0) === 0,
                    renderRight:
                      (imagesQuery.data?.stills?.length || 0) + (videosQuery.data?.results?.length || 0) > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp
                                  duration={1}
                                  end={
                                    (imagesQuery.data?.stills?.length || 0) + (videosQuery.data?.results?.length || 0)
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
                  episodeQuery={episodeQuery}
                  creditsQuery={creditsQuery}
                  imagesQuery={imagesQuery}
                  videosQuery={videosQuery}
                  onAssetClick={handleOnAssetClick}
                  onChangeTab={handleChangeTab}
                />
                <CastCrewTab
                  alt={episodeQuery.data?.name}
                  credits={creditsQuery.data}
                  isError={creditsQuery.isError}
                  isSuccess={creditsQuery.isSuccess}
                  isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
                />
                <AssetsTab
                  alt={episodeQuery.data?.name}
                  assets={{
                    backdrops: imagesQuery.data?.stills,
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

      {/* {imagesQuery.isSuccess ? (
        <MediaViewer
          alt={collectionQuery.data?.name ? `"${collectionQuery.data.name}" photo` : 'Collection Photo'}
          assets={[
            {
              label: 'Posters',
              mediaItems: (imagesQuery.data?.posters || []).map((image) => {
                return {
                  type: 'image',
                  boringType: handleReturnBoringTypeByMediaType('collection'),
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
                  boringType: handleReturnBoringTypeByMediaType('collection'),
                  srcSize: ['w300', 'original'],
                  data: { ...image }
                };
              })
            }
          ]}
          selectedPath={selectedPath}
          isOpen={isMediaViewerOpen}
          onClose={onMediaViewerClose}
        />
      ) : null} */}
    </>
  );
};

export default Episode;
