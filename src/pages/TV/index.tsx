import React, { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../common/scripts/axios';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import Page from '../../containers/Page';
import { home, tv } from '../../containers/Page/common/data/breadcrumbs';
import HorizontalGrid from './components/HorizontalGrid';

const TV = (): ReactElement => {
  const source = axios.CancelToken.source();

  // Fetching popular tv
  const popularTVQuery = useQuery('popularTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching tv airing_today
  const tvAiringTodayQuery = useQuery('tvAiringToday', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/airing_today', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching on tv
  const onTVQuery = useQuery('onTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/on_the_air', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching top rated tv
  const topRatedTVQuery = useQuery('topRatedTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/top_rated', {
      cancelToken: source.token
    });
    return data.results;
  });

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='TV Shows' breadcrumbs={[home, tv]}>
      {{
        body: (
          <VStack spacing={6}>
            <HorizontalGrid
              tv={popularTVQuery.data}
              title='Popular TV Shows'
              pathname='/tv/popular'
              isError={popularTVQuery.isError}
              isSuccess={popularTVQuery.isSuccess}
              isLoading={popularTVQuery.isFetching || popularTVQuery.isLoading}
            />

            <HorizontalGrid
              tv={tvAiringTodayQuery.data}
              title='TV Shows Airing Today'
              pathname='/tv/airing-today'
              isError={tvAiringTodayQuery.isError}
              isSuccess={tvAiringTodayQuery.isSuccess}
              isLoading={tvAiringTodayQuery.isFetching || tvAiringTodayQuery.isLoading}
            />

            <HorizontalGrid
              tv={onTVQuery.data}
              title='TV Shows on at the moment'
              pathname='/tv/on-tv'
              isError={onTVQuery.isError}
              isSuccess={onTVQuery.isSuccess}
              isLoading={onTVQuery.isFetching || onTVQuery.isLoading}
            />

            <HorizontalGrid
              tv={topRatedTVQuery.data}
              title='Top Rated TV Shows'
              pathname='/tv/top-rated'
              isError={topRatedTVQuery.isError}
              isSuccess={topRatedTVQuery.isSuccess}
              isLoading={topRatedTVQuery.isFetching || topRatedTVQuery.isLoading}
            />
          </VStack>
        )
      }}
    </Page>
  );
};

export default TV;
