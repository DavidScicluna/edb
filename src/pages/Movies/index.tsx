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
        isLoading={popularMovies.isFetching || popularMovies.isLoading}
        path={{ pathname: '/movies/popular' }}>
        <HorizontalMovies
          isError={popularMovies.isError}
          isSuccess={popularMovies.isSuccess && !popularMovies.isFetching && !popularMovies.isLoading}
          movies={popularMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Upcoming Movies'
        isLoading={upcomingMovies.isFetching || upcomingMovies.isLoading}
        path={{ pathname: '/movies/upcoming' }}>
        <HorizontalMovies
          isError={upcomingMovies.isError}
          isSuccess={upcomingMovies.isSuccess && !upcomingMovies.isFetching && !upcomingMovies.isLoading}
          movies={upcomingMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Movies Now Playing'
        isLoading={moviesNowPlaying.isFetching || moviesNowPlaying.isLoading}
        path={{ pathname: '/movies/now-playing' }}>
        <HorizontalMovies
          isError={moviesNowPlaying.isError}
          isSuccess={moviesNowPlaying.isSuccess && !moviesNowPlaying.isFetching && !moviesNowPlaying.isLoading}
          movies={moviesNowPlaying.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Top Rated Movies'
        isLoading={topRatedMovies.isFetching || topRatedMovies.isLoading}
        path={{ pathname: '/movies/top-rated' }}>
        <HorizontalMovies
          isError={topRatedMovies.isError}
          isSuccess={topRatedMovies.isSuccess && !topRatedMovies.isFetching && !topRatedMovies.isLoading}
          movies={topRatedMovies.data}
        />
      </HorizontalGrid>
    </VStack>
  );
};

export default Movies;
