import React, { ReactElement, useEffect } from 'react';

import { useColorMode, useMediaQuery, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Button from '../../components/Clickable/Button';
import Link from '../../components/Clickable/Link';
import HorizontalGrid from '../../components/Grid/Horizontal';
import Page from '../../containers/Page';
import HorizontalMovies from '../Movies/components/HorizontalMovies';
import HorizontalPeople from '../People/components/HorizontalPeople';
import HorizontalTV from '../TV/components/HorizontalTV';

const Home = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  // Fetching popular movies
  const popularMoviesQuery = useQuery('popularMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending movies
  const trendingMoviesQuery = useQuery('trendingMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/trending/movie/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching popular TV
  const popularTVQuery = useQuery('popularTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending TV
  const trendingTVQuery = useQuery('trendingTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/trending/tv/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending People
  const trendingPeopleQuery = useQuery('trendingPeople', async () => {
    const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/trending/person/day', {
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
    <Page title='Home' breadcrumbs={[]}>
      {{
        body: (
          <VStack spacing={6}>
            <HorizontalGrid
              title={handleRenderTitle('Popular movies')}
              footer={
                <Link
                  to={{ pathname: '/movies/popular' }}
                  isFullWidth
                  isDisabled={popularMoviesQuery.isFetching || popularMoviesQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={popularMoviesQuery.isFetching || popularMoviesQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Popular movies
                  </Button>
                </Link>
              }
              isLoading={popularMoviesQuery.isFetching || popularMoviesQuery.isLoading}>
              <HorizontalMovies
                isError={popularMoviesQuery.isError}
                isSuccess={popularMoviesQuery.isSuccess}
                isLoading={popularMoviesQuery.isFetching || popularMoviesQuery.isLoading}
                movies={popularMoviesQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Trending movies')}
              footer={
                <Link
                  to={{ pathname: '/trending/movie' }}
                  isFullWidth
                  isDisabled={trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Trending movies
                  </Button>
                </Link>
              }
              isLoading={trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading}>
              <HorizontalMovies
                isError={trendingMoviesQuery.isError}
                isSuccess={trendingMoviesQuery.isSuccess}
                isLoading={trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading}
                movies={trendingMoviesQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Popular TV shows')}
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
                    View all Popular TV
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
              title={handleRenderTitle('Trending TV shows')}
              footer={
                <Link
                  to={{ pathname: '/trending/tv' }}
                  isFullWidth
                  isDisabled={trendingTVQuery.isFetching || trendingTVQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={trendingTVQuery.isFetching || trendingTVQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Trending TV
                  </Button>
                </Link>
              }
              isLoading={trendingTVQuery.isFetching || trendingTVQuery.isLoading}>
              <HorizontalTV
                isError={trendingTVQuery.isError}
                isSuccess={trendingTVQuery.isSuccess}
                isLoading={trendingTVQuery.isFetching || trendingTVQuery.isLoading}
                tv={trendingTVQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Trending People')}
              footer={
                <Link
                  to={{ pathname: '/trending/person' }}
                  isFullWidth
                  isDisabled={trendingPeopleQuery.isFetching || trendingPeopleQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={trendingPeopleQuery.isFetching || trendingPeopleQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Trending People
                  </Button>
                </Link>
              }
              isLoading={trendingPeopleQuery.isFetching || trendingPeopleQuery.isLoading}>
              <HorizontalPeople
                isError={trendingPeopleQuery.isError}
                isSuccess={trendingPeopleQuery.isSuccess}
                isLoading={trendingPeopleQuery.isFetching || trendingPeopleQuery.isLoading}
                people={trendingPeopleQuery.data}
              />
            </HorizontalGrid>
          </VStack>
        )
      }}
    </Page>
  );
};

export default Home;
