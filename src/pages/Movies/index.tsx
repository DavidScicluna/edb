import React, { ReactElement, useEffect } from 'react';

import { useColorMode, useMediaQuery, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Button from '../../components/Clickable/Button';
import Link from '../../components/Clickable/Link';
import HorizontalGrid from '../../components/Grid/Horizontal';
import HorizontalMovies from '../../components/Movies/Grid/Horizontal';
import Page from '../../containers/Page';
import { home, movies } from '../../containers/Page/common/data/breadcrumbs';

const Movies = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  // Fetching popular movies
  const popularMovies = useQuery('popularMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching upcoming movies
  const upcomingMovies = useQuery('upcomingMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/upcoming', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching movies now playing
  const moviesNowPlaying = useQuery('moviesNowPlaying', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/now_playing', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching top rated movies
  const topRatedMovies = useQuery('topRatedMovies', async () => {
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
        fontSize='2xl'
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
                  isDisabled={popularMovies.isFetching || popularMovies.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={popularMovies.isFetching || popularMovies.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Popular Movies
                  </Button>
                </Link>
              }
              isLoading={popularMovies.isFetching || popularMovies.isLoading}>
              <HorizontalMovies
                isError={popularMovies.isError}
                isSuccess={popularMovies.isSuccess && !popularMovies.isFetching && !popularMovies.isLoading}
                movies={popularMovies.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Upcoming Movies')}
              footer={
                <Link
                  to={{ pathname: '/movies/upcoming' }}
                  isFullWidth
                  isDisabled={upcomingMovies.isFetching || upcomingMovies.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={upcomingMovies.isFetching || upcomingMovies.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Upcoming Movies
                  </Button>
                </Link>
              }
              isLoading={upcomingMovies.isFetching || upcomingMovies.isLoading}>
              <HorizontalMovies
                isError={upcomingMovies.isError}
                isSuccess={upcomingMovies.isSuccess && !upcomingMovies.isFetching && !upcomingMovies.isLoading}
                movies={upcomingMovies.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Movies Now Playing')}
              footer={
                <Link
                  to={{ pathname: '/movies/now-playing' }}
                  isFullWidth
                  isDisabled={moviesNowPlaying.isFetching || moviesNowPlaying.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={moviesNowPlaying.isFetching || moviesNowPlaying.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Movies Now Playing
                  </Button>
                </Link>
              }
              isLoading={moviesNowPlaying.isFetching || moviesNowPlaying.isLoading}>
              <HorizontalMovies
                isError={moviesNowPlaying.isError}
                isSuccess={moviesNowPlaying.isSuccess && !moviesNowPlaying.isFetching && !moviesNowPlaying.isLoading}
                movies={moviesNowPlaying.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title={handleRenderTitle('Top Rated Movies')}
              footer={
                <Link
                  to={{ pathname: '/movies/top-rated' }}
                  isFullWidth
                  isDisabled={topRatedMovies.isFetching || topRatedMovies.isLoading}>
                  <Button
                    color={utils.handleReturnColor(color)}
                    isFullWidth
                    isDisabled={topRatedMovies.isFetching || topRatedMovies.isLoading}
                    size={isSm ? 'sm' : 'md'}
                    variant='text'>
                    View all Movies Now Playing
                  </Button>
                </Link>
              }
              isLoading={topRatedMovies.isFetching || topRatedMovies.isLoading}>
              <HorizontalMovies
                isError={topRatedMovies.isError}
                isSuccess={topRatedMovies.isSuccess && !topRatedMovies.isFetching && !topRatedMovies.isLoading}
                movies={topRatedMovies.data}
              />
            </HorizontalGrid>
          </VStack>
        )
      }}
    </Page>
  );
};

export default Movies;
