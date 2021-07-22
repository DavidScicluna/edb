import React, { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../common/scripts/axios';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import HorizontalGrid from '../../components/Grid/Horizontal';
import HorizontalTV from '../../components/TV/Grid/Horizontal';

const TV = (): ReactElement => {
  const source = axios.CancelToken.source();

  // Fetching popular tv
  const popularTV = useQuery('popularTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching tv airing_today
  const tvAiringToday = useQuery('tvAiringToday', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/airing_today', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching on tv
  const onTV = useQuery('onTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/on_the_air', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching top rated tv
  const topRatedTV = useQuery('topRatedTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/top_rated', {
      cancelToken: source.token
    });
    return data.results;
  });

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VStack spacing={6}>
      <HorizontalGrid
        title='Popular TV Shows'
        isLoading={popularTV.isFetching || popularTV.isLoading}
        path={{ pathname: '/tv/popular' }}>
        <HorizontalTV
          isError={popularTV.isError}
          isSuccess={popularTV.isSuccess && !popularTV.isFetching && !popularTV.isLoading}
          tv={popularTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='TV Shows Airing Today'
        isLoading={tvAiringToday.isFetching || tvAiringToday.isLoading}
        path={{ pathname: '/tv/airing-today' }}>
        <HorizontalTV
          isError={tvAiringToday.isError}
          isSuccess={tvAiringToday.isSuccess && !tvAiringToday.isFetching && !tvAiringToday.isLoading}
          tv={tvAiringToday.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='TV Shows on at the moment'
        isLoading={onTV.isFetching || onTV.isLoading}
        path={{ pathname: '/tv/on-tv' }}>
        <HorizontalTV
          isError={onTV.isError}
          isSuccess={onTV.isSuccess && !onTV.isFetching && !onTV.isLoading}
          tv={onTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Top Rated TV Shows'
        isLoading={topRatedTV.isFetching || topRatedTV.isLoading}
        path={{ pathname: '/tv/top-rated' }}>
        <HorizontalTV
          isError={topRatedTV.isError}
          isSuccess={topRatedTV.isSuccess && !topRatedTV.isFetching && !topRatedTV.isLoading}
          tv={topRatedTV.data}
        />
      </HorizontalGrid>
    </VStack>
  );
};

export default TV;
