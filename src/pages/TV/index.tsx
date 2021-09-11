import React, { ReactElement, useEffect } from 'react';

import { useColorMode, useMediaQuery, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Button from '../../components/Clickable/Button';
import Link from '../../components/Clickable/Link';
import HorizontalGrid from '../../components/Grid/Horizontal';
import Page from '../../containers/Page';
import { home, tv } from '../../containers/Page/common/data/breadcrumbs';
import HorizontalTV from './components/HorizontalTV';

const TV = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

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

  const handleRenderTitle = (title: string): ReactElement => {
    return (
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        fontSize={['xl', 'xl', '2xl', '2xl', '2xl', '2xl']}
        fontWeight='semibold'
        textTransform='capitalize'>
        {title}
      </Text>
    );
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='TV Shows' breadcrumbs={[home, tv]}>
      {{
        body: (
          <VStack spacing={6}>
            <HorizontalGrid
              title={handleRenderTitle('Popular TV Shows')}
              footer={
                <Link
                  to={{ pathname: '/tv/popular' }}
                  isFullWidth
                  isDisabled={popularTVQuery.isFetching || popularTVQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={popularTVQuery.isFetching || popularTVQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Popular TV Shows
                  </Button>
                </Link>
              }
              isLoading={popularTVQuery.isFetching || popularTVQuery.isLoading}>
              <HorizontalTV
                isError={popularTVQuery.isError}
                isSuccess={popularTVQuery.isSuccess}
                isLoading={popularTVQuery.isFetching || popularTVQuery.isLoading}
                tv={popularTVQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('TV Shows Airing Today')}
              footer={
                <Link
                  to={{ pathname: '/tv/airing-today' }}
                  isFullWidth
                  isDisabled={tvAiringTodayQuery.isFetching || tvAiringTodayQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={tvAiringTodayQuery.isFetching || tvAiringTodayQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all TV Shows Airing Today
                  </Button>
                </Link>
              }
              isLoading={tvAiringTodayQuery.isFetching || tvAiringTodayQuery.isLoading}>
              <HorizontalTV
                isError={tvAiringTodayQuery.isError}
                isSuccess={tvAiringTodayQuery.isSuccess}
                isLoading={tvAiringTodayQuery.isFetching || tvAiringTodayQuery.isLoading}
                tv={tvAiringTodayQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('TV Shows on at the moment')}
              footer={
                <Link
                  to={{ pathname: '/tv/on-tv' }}
                  isFullWidth
                  isDisabled={onTVQuery.isFetching || onTVQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={onTVQuery.isFetching || onTVQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all TV Shows on at the moment
                  </Button>
                </Link>
              }
              isLoading={onTVQuery.isFetching || onTVQuery.isLoading}>
              <HorizontalTV
                isError={onTVQuery.isError}
                isSuccess={onTVQuery.isSuccess}
                isLoading={onTVQuery.isFetching || onTVQuery.isLoading}
                tv={onTVQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Top Rated TV Shows')}
              footer={
                <Link
                  to={{ pathname: '/tv/top-rated' }}
                  isFullWidth
                  isDisabled={topRatedTVQuery.isFetching || topRatedTVQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={topRatedTVQuery.isFetching || topRatedTVQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Top Rated TV Shows
                  </Button>
                </Link>
              }
              isLoading={topRatedTVQuery.isFetching || topRatedTVQuery.isLoading}>
              <HorizontalTV
                isError={topRatedTVQuery.isError}
                isSuccess={topRatedTVQuery.isSuccess}
                isLoading={topRatedTVQuery.isFetching || topRatedTVQuery.isLoading}
                tv={topRatedTVQuery.data}
              />
            </HorizontalGrid>
          </VStack>
        )
      }}
    </Page>
  );
};

export default TV;
