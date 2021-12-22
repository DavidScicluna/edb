import { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../common/scripts/axios';
import { Response } from '../../common/types';
import { PartialMovie } from '../../common/types/movie';
import Page from '../../containers/Page';
import { home, movies } from '../../containers/Page/common/data/breadcrumbs';
import HorizontalGrid from './components/HorizontalGrid';

const Movies = (): ReactElement => {
  const source = axios.CancelToken.source();

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

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='Movies'>
      {{
        body: (
          <VStack spacing={6}>
            <HorizontalGrid
              movies={popularMoviesQuery.data}
              title='Popular movies'
              pathname='/movies/popular'
              isError={popularMoviesQuery.isError}
              isSuccess={popularMoviesQuery.isSuccess}
              isLoading={popularMoviesQuery.isFetching || popularMoviesQuery.isLoading}
            />

            <HorizontalGrid
              movies={upcomingMoviesQuery.data}
              title='Upcoming Movies'
              pathname='/movies/upcoming'
              isError={upcomingMoviesQuery.isError}
              isSuccess={upcomingMoviesQuery.isSuccess}
              isLoading={upcomingMoviesQuery.isFetching || upcomingMoviesQuery.isLoading}
            />

            <HorizontalGrid
              movies={moviesNowPlayingQuery.data}
              title='Movies Now Playing'
              pathname='/movies/now-playing'
              isError={moviesNowPlayingQuery.isError}
              isSuccess={moviesNowPlayingQuery.isSuccess}
              isLoading={moviesNowPlayingQuery.isFetching || moviesNowPlayingQuery.isLoading}
            />

            <HorizontalGrid
              movies={topRatedMoviesQuery.data}
              title='Top Rated Movies'
              pathname='/movies/top-rated'
              isError={topRatedMoviesQuery.isError}
              isSuccess={topRatedMoviesQuery.isSuccess}
              isLoading={topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading}
            />
          </VStack>
        )
      }}
    </Page>
  );
};

export default Movies;
