import React, { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Button from '../../components/Clickable/Button';
import Link from '../../components/Clickable/Link';
import HorizontalGrid from '../../components/Grid/Horizontal';
import HorizontalTV from '../../components/TV/Grid/Horizontal';

const TV = (): ReactElement => {
  const source = axios.CancelToken.source();

  const color = useSelector((state) => state.user.ui.theme.color);

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
        footer={
          <Link to={!popularTV.isFetching || !popularTV.isLoading ? { pathname: '/tv/popular' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={popularTV.isFetching || popularTV.isLoading}
              variant='text'>
              View all Popular TV Shows
            </Button>
          </Link>
        }
        isLoading={popularTV.isFetching || popularTV.isLoading}>
        <HorizontalTV
          isError={popularTV.isError}
          isSuccess={popularTV.isSuccess && !popularTV.isFetching && !popularTV.isLoading}
          tv={popularTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='TV Shows Airing Today'
        footer={
          <Link to={!tvAiringToday.isFetching || !tvAiringToday.isLoading ? { pathname: '/tv/airing-today' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={tvAiringToday.isFetching || tvAiringToday.isLoading}
              variant='text'>
              View all TV Shows Airing Today
            </Button>
          </Link>
        }
        isLoading={tvAiringToday.isFetching || tvAiringToday.isLoading}>
        <HorizontalTV
          isError={tvAiringToday.isError}
          isSuccess={tvAiringToday.isSuccess && !tvAiringToday.isFetching && !tvAiringToday.isLoading}
          tv={tvAiringToday.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='TV Shows on at the moment'
        footer={
          <Link to={!onTV.isFetching || !onTV.isLoading ? { pathname: '/tv/on-tv' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={onTV.isFetching || onTV.isLoading}
              variant='text'>
              View all TV Shows on at the moment
            </Button>
          </Link>
        }
        isLoading={onTV.isFetching || onTV.isLoading}>
        <HorizontalTV
          isError={onTV.isError}
          isSuccess={onTV.isSuccess && !onTV.isFetching && !onTV.isLoading}
          tv={onTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Top Rated TV Shows'
        footer={
          <Link to={!topRatedTV.isFetching || !topRatedTV.isLoading ? { pathname: '/tv/top-rated' } : {}}>
            <Button
              color={utils.handleReturnColor(color)}
              isFullWidth
              isDisabled={topRatedTV.isFetching || topRatedTV.isLoading}
              variant='text'>
              View all Top Rated TV Shows
            </Button>
          </Link>
        }
        isLoading={topRatedTV.isFetching || topRatedTV.isLoading}>
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
