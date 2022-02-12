import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, Text, Fade } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import CountUp from 'react-countup';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
import { Images } from '../../../../common/types';
import { Collection as CollectionType } from '../../../../common/types/movie';
import { handleReturnBoringTypeByMediaType } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import MediaViewer from '../../../../components/MediaViewer';
import SkeletonText from '../../../../components/Skeleton/Text';
import Tabs from '../../../../components/Tabs';
import TabList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Actions from '../../components/Actions';
import AssetsTab from '../../components/Assets';
import Structure from '../../components/Structure';
import Title from '../../components/Title';
import OverviewTab from './components/OverviewTab';
import PartsTab from './components/PartsTab';

const dummies = _.range(25, 75, 10);

const Collection = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [selectedPath, setSelectedPath] = useState<string>();

  const [dummy] = useState<number>(_.sample(dummies) || 75);

  // Fetching collection
  const collectionQuery = useQuery([`collection-${id}`, id], async () => {
    const { data } = await axiosInstance.get<CollectionType>(`/collection/${id}`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching collection images
  const imagesQuery = useQuery([`collection-${id}-images`, id], async () => {
    const { data } = await axiosInstance.get<Images>(`/collection/${id}/images`, {
      cancelToken: source.token
    });
    return data;
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
  const handleOnImageClick = (path: string): void => {
    setSelectedPath(path);
    onMediaViewerOpen();
  };

  const handleCheckLocation = (): void => {
    const hash = String(location.hash).replace('#', '');

    switch (hash) {
      case 'parts':
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
                mediaType='collection'
                renderTitle={({ color, fontSize, fontWeight }) => (
                  <SkeletonText
                    width={collectionQuery.isFetching || collectionQuery.isLoading ? `${dummy}%` : 'auto'}
                    fontSize={fontSize}
                    isLoaded={!collectionQuery.isFetching || !collectionQuery.isLoading}
                  >
                    <Text
                      align='left'
                      color={color}
                      fontSize={fontSize}
                      fontWeight={fontWeight}
                      whiteSpace={collectionQuery.isFetching || collectionQuery.isLoading ? 'nowrap' : 'normal'}
                    >
                      {collectionQuery.data?.name || 'Collection Name'}
                    </Text>
                  </SkeletonText>
                )}
                isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
              />
            ),
            actions: (
              <Actions
                mediaItem={collectionQuery.data}
                mediaType='collection'
                title={collectionQuery.data?.name}
                isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
                isError={collectionQuery.isError}
              />
            ),
            tabList: (
              <TabList color={color}>
                {[
                  {
                    label: 'Overview'
                  },
                  {
                    label: 'Parts',
                    renderRight:
                      (collectionQuery.data?.parts || []).length > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp duration={1} end={collectionQuery.data?.parts?.length || 0} />
                              </Badge>
                            </Fade>
                          )
                        : undefined
                  },
                  {
                    label: 'Assets',
                    renderRight:
                      (collectionQuery.data?.parts || []).length > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp duration={1} end={collectionQuery.data?.parts?.length || 0} />
                              </Badge>
                            </Fade>
                          )
                        : undefined
                  }
                ]}
              </TabList>
            ),
            socials:
              activeTab === 1 ? (
                <Fade in unmountOnExit>
                  <DisplayMode />
                </Fade>
              ) : undefined,
            tabPanels: (
              <TabPanels>
                <OverviewTab
                  collectionQuery={collectionQuery}
                  imagesQuery={imagesQuery}
                  onClickImage={handleOnImageClick}
                  onChangeTab={handleChangeTab}
                />
                <PartsTab
                  name={collectionQuery.data?.name || undefined}
                  isError={collectionQuery.isError}
                  isSuccess={collectionQuery.isSuccess}
                  isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
                  parts={collectionQuery.data?.parts || []}
                />
                <AssetsTab
                  alt={collectionQuery.data?.name}
                  images={{
                    posters: imagesQuery.data?.posters,
                    backdrops: imagesQuery.data?.backdrops
                  }}
                  isError={{ images: imagesQuery.isError }}
                  isSuccess={{ images: imagesQuery.isSuccess }}
                  isLoading={{ images: imagesQuery.isFetching || imagesQuery.isLoading }}
                  onClickImage={handleOnImageClick}
                />
              </TabPanels>
            )
          }}
        </Structure>
      </Tabs>

      {imagesQuery.isSuccess ? (
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
      ) : null}
    </>
  );
};

export default Collection;
