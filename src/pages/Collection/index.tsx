import React, { ReactElement, useState, useEffect } from 'react';

import { useColorMode, useBreakpointValue, VStack, Text, HStack, Fade } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useElementSize } from 'usehooks-ts';

import axiosInstance from '../../common/scripts/axios';
import { Images } from '../../common/types';
import { Collection as CollectionType } from '../../common/types/movie';
import DisplayMode from '../../components/Clickable/DisplayMode';
import Divider from '../../components/Divider';
import SkeletonText from '../../components/Skeleton/Text';
import Tabs from '../../components/Tabs';
import TabList from '../../components/Tabs/components/TabList';
import TabPanels from '../../components/Tabs/components/TabPanels';
import Page from '../../containers/Page';
import { FontSizes } from '../../theme/types';
import Actions from './components/Actions';
import Overview from './components/Overview';
import Parts from './components/Parts';

const Collection = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { colorMode } = useColorMode();
  const fontSize = useBreakpointValue<keyof FontSizes>({
    'base': '2xl',
    'sm': '2xl',
    'md': '3xl',
    'lg': '3xl',
    'xl': '3xl',
    '2xl': '3xl'
  });

  const { id } = useParams<{ id: string }>();

  const [ref, { height }] = useElementSize();

  const [activeTab, setActiveTab] = useState<number>(0);

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

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
      <Page
        title={
          <SkeletonText fontSize={fontSize} isLoaded={!(collectionQuery.isFetching || collectionQuery.isLoading)}>
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={fontSize}
              fontWeight='bold'
            >
              {collectionQuery.data?.name || 'Collection Name'}
            </Text>
          </SkeletonText>
        }
      >
        {{
          actions: (
            <Actions
              collection={collectionQuery.data}
              isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
            />
          ),
          body: (
            <VStack width='100%' spacing={2} px={2} pt={2}>
              <HStack
                width='100%'
                height='43px' // Size of DisplayMode Height
                divider={
                  <Fade in={activeTab === 1} unmountOnExit>
                    <Divider orientation='vertical' height={`${height}px`} mx={2} />
                  </Fade>
                }
              >
                <TabList
                  renderTabs={[
                    {
                      label: 'Overview'
                    },
                    {
                      label: 'Parts' // TODO: Add Parts length Badge
                    }
                  ]}
                />

                <Fade in={activeTab === 1} unmountOnExit>
                  <DisplayMode ref={ref} />
                </Fade>
              </HStack>

              <Divider />

              <TabPanels>
                <Overview collectionQuery={collectionQuery} imagesQuery={imagesQuery} />
                <Parts
                  name={collectionQuery.data?.name || undefined}
                  isError={collectionQuery.isError}
                  isSuccess={collectionQuery.isSuccess}
                  isLoading={collectionQuery.isFetching || collectionQuery.isLoading}
                  parts={collectionQuery.data?.parts || []}
                />
              </TabPanels>
            </VStack>
          )
        }}
      </Page>
    </Tabs>
  );
};

export default Collection;
