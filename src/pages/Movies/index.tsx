import React, { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { Response } from '../../common/types/types';
import HorizontalGrid from '../../components/Grid/Horizontal';
import HorizontalMovies from '../../components/Movies/Grid/Horizontal';

const Movies = (): ReactElement => {
  const source = axios.CancelToken.source();

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

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VStack spacing={6}>
      <HorizontalGrid
        title='Popular Movies'
        isLoading={popularMovies.isLoading || popularMovies.isFetching}
        path={{ pathname: '/movies/popular' }}>
        <HorizontalMovies
          isLoading={popularMovies.isLoading || popularMovies.isFetching}
          isError={popularMovies.isError}
          isSuccess={popularMovies.isSuccess}
          movies={popularMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Upcoming Movies'
        isLoading={upcomingMovies.isLoading || upcomingMovies.isFetching}
        path={{ pathname: '/movies/upcoming' }}>
        <HorizontalMovies
          isLoading={upcomingMovies.isLoading || upcomingMovies.isFetching}
          isError={upcomingMovies.isError}
          isSuccess={upcomingMovies.isSuccess}
          movies={upcomingMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Movies Now Playing'
        isLoading={moviesNowPlaying.isLoading || moviesNowPlaying.isFetching}
        path={{ pathname: '/movies/now-playing' }}>
        <HorizontalMovies
          isLoading={moviesNowPlaying.isLoading || moviesNowPlaying.isFetching}
          isError={moviesNowPlaying.isError}
          isSuccess={moviesNowPlaying.isSuccess}
          movies={moviesNowPlaying.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Top Rated Movies'
        isLoading={topRatedMovies.isLoading || topRatedMovies.isFetching}
        path={{ pathname: '/movies/top-rated' }}>
        <HorizontalMovies
          isLoading={topRatedMovies.isLoading || topRatedMovies.isFetching}
          isError={topRatedMovies.isError}
          isSuccess={topRatedMovies.isSuccess}
          movies={topRatedMovies.data}
        />
      </HorizontalGrid>
    </VStack>
  );
};

export default Movies;
