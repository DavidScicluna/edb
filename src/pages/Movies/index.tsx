import React, { ReactElement, useEffect } from 'react';

import { useColorMode, useMediaQuery, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Button from '../../components/Clickable/Button';
import Link from '../../components/Clickable/Link';
import HorizontalGrid from '../../components/Grid/Horizontal';
import Page from '../../containers/Page';
import { home, movies } from '../../containers/Page/common/data/breadcrumbs';
import HorizontalMovies from './components/HorizontalMovies';

const Movies = (): ReactElement => {
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

  // Fetching upcoming movies
  const upcomingMoviesQuery = useQuery('upcomingMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/upcoming', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching movies now playing
  const moviesNowPlayingQuery = useQuery('moviesNowPlaying', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/now_playing', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching top rated movies
  const topRatedMoviesQuery = useQuery('topRatedMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/top_rated', {
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
    <Page title='Movies' breadcrumbs={[home, movies]}>
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
                    View all Popular Movies
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
              title={handleRenderTitle('Upcoming Movies')}
              footer={
                <Link
                  to={{ pathname: '/movies/upcoming' }}
                  isFullWidth
                  isDisabled={upcomingMoviesQuery.isFetching || upcomingMoviesQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={upcomingMoviesQuery.isFetching || upcomingMoviesQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Upcoming Movies
                  </Button>
                </Link>
              }
              isLoading={upcomingMoviesQuery.isFetching || upcomingMoviesQuery.isLoading}>
              <HorizontalMovies
                isError={upcomingMoviesQuery.isError}
                isSuccess={upcomingMoviesQuery.isSuccess}
                isLoading={upcomingMoviesQuery.isFetching || upcomingMoviesQuery.isLoading}
                movies={upcomingMoviesQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Movies Now Playing')}
              footer={
                <Link
                  to={{ pathname: '/movies/now-playing' }}
                  isFullWidth
                  isDisabled={moviesNowPlayingQuery.isFetching || moviesNowPlayingQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={moviesNowPlayingQuery.isFetching || moviesNowPlayingQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Movies Now Playing
                  </Button>
                </Link>
              }
              isLoading={moviesNowPlayingQuery.isFetching || moviesNowPlayingQuery.isLoading}>
              <HorizontalMovies
                isError={moviesNowPlayingQuery.isError}
                isSuccess={moviesNowPlayingQuery.isSuccess}
                isLoading={moviesNowPlayingQuery.isFetching || moviesNowPlayingQuery.isLoading}
                movies={moviesNowPlayingQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Top Rated Movies')}
              footer={
                <Link
                  to={{ pathname: '/movies/top-rated' }}
                  isFullWidth
                  isDisabled={topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Movies Now Playing
                  </Button>
                </Link>
              }
              isLoading={topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading}>
              <HorizontalMovies
                isError={topRatedMoviesQuery.isError}
                isSuccess={topRatedMoviesQuery.isSuccess}
                isLoading={topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading}
                movies={topRatedMoviesQuery.data}
              />
            </HorizontalGrid>
          </VStack>
        )
      }}
    </Page>
  );
};

export default Movies;
