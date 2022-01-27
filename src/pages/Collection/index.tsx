import React, { ReactElement, useState, useEffect } from 'react';

import { useColorMode, useBreakpointValue, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import axiosInstance from '../../common/scripts/axios';
import { Images } from '../../common/types';
import { Collection as CollectionType } from '../../common/types/movie';
import Divider from '../../components/Divider';
import SkeletonText from '../../components/Skeleton/Text';
import Tabs from '../../components/Tabs';
import TabList from '../../components/Tabs/components/TabList';
import TabPanels from '../../components/Tabs/components/TabPanels';
import Page from '../../containers/Page';
import Overview from './components/Overview';
import Parts from './components/Parts';

const Collection = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { colorMode } = useColorMode();
  const offsetY = useBreakpointValue({
    'base': '12px',
    'sm': '12px',
    'md': '15px',
    'lg': '15px',
    'xl': '15px',
    '2xl': '15px'
  });

  const { id } = useParams<{ id: string }>();

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
          <SkeletonText offsetY={offsetY} isLoaded={!(collectionQuery.isFetching || collectionQuery.isLoading)}>
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={['2xl', '2xl', '3xl', '3xl', '3xl', '3xl']}
              fontWeight='bold'
            >
              {collectionQuery.data?.name || 'Collection Name'}
            </Text>
          </SkeletonText>
        }
      >
        {{
          body: (
            <VStack width='100%' spacing={2} px={2} pt={2}>
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
