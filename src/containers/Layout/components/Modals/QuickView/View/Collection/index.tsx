import React, { ReactElement, useState, useEffect } from 'react';

import { useColorMode, useMediaQuery, useDisclosure, Stack, Center, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import CountUp from 'react-countup';
import { useQuery } from 'react-query';

import axiosInstance from '../../../../../../../common/scripts/axios';
import { Images } from '../../../../../../../common/types';
import { Collection as CollectionType } from '../../../../../../../common/types/movie';
import { handleReturnBoringTypeByMediaType } from '../../../../../../../common/utils';
import MediaViewer from '../../../../../../../components/MediaViewer';
import SkeletonText from '../../../../../../../components/Skeleton/Text';
import Title from '../../../../../../../pages/View/components/Title';
import Actions from '../../components/Actions';
import Poster from '../../components/Poster';
import Overview from './components/Overview';
import { CollectionProps } from './types';

const dummies = _.range(25, 75, 10);

const Collection = ({ id }: CollectionProps): ReactElement => {
  const source = axios.CancelToken.source();

  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const [selectedImagePath, setSelectedImagePath] = useState<string>();

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

  /**
   * This method will open the image passed in the media modal
   *
   * @param image - Image object
   */
  const handleOnPosterClick = (path: string): void => {
    setSelectedImagePath(path);
    onMediaViewerOpen();
  };

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      <Stack width='100%' maxWidth='100%' direction={isSm ? 'column' : 'row'} spacing={isSm ? 4 : 2} p={2}>
        <Center width={isSm ? '100%' : '40%'} maxWidth={isSm ? '100%' : '40%'}>
          <Poster
            alt={collectionQuery.data?.name || ''}
            path={collectionQuery.data?.poster_path || ''}
            mediaType='collection'
            srcSize={['w92', 'original']}
            isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
            onClickPoster={handleOnPosterClick}
          />
        </Center>
        <Center width={isSm ? '100%' : '60%'} maxWidth={isSm ? '100%' : '60%'}>
          <VStack width='100%' spacing={4}>
            <VStack width='100%' spacing={2}>
              <VStack width='100%' spacing={collectionQuery.isFetching || collectionQuery.isLoading ? 1 : 0}>
                <Title
                  mediaType='collection'
                  renderTitle={({ color, fontSize, fontWeight }) => (
                    <SkeletonText
                      width={collectionQuery.isFetching || collectionQuery.isLoading ? `${dummy}%` : '100%'}
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
                <SkeletonText
                  width='100%'
                  fontSize='md'
                  isLoaded={!collectionQuery.isFetching || !collectionQuery.isLoading}
                >
                  <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md'>
                    <CountUp
                      duration={1}
                      end={collectionQuery.data?.parts?.length || 0}
                      prefix='Collection has a total of '
                      suffix=' parts.'
                    />
                  </Text>
                </SkeletonText>
              </VStack>

              {(!_.isNil(collectionQuery.data?.overview) && !_.isEmpty(collectionQuery.data?.overview)) ||
              collectionQuery.isFetching ||
              collectionQuery.isLoading ? (
                <Overview
                  overview={collectionQuery.data?.overview}
                  isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
                />
              ) : null}
            </VStack>

            <Actions
              mediaItem={collectionQuery.data}
              mediaType='collection'
              title={collectionQuery.data?.name}
              isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
              isError={collectionQuery.isError}
            />
          </VStack>
        </Center>
      </Stack>

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
          selectedPath={selectedImagePath}
          isOpen={isMediaViewerOpen}
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default Collection;
