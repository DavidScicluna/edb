import React, { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import HorizontalGrid from '../../components/Grid/Horizontal';
import HorizontalMovies from '../../components/Movies/Grid/Horizontal';
import HorizontalPeople from '../../components/People/Grid/Horizontal';
import HorizontalTV from '../../components/TV/Grid/Horizontal';

const Home = (): ReactElement => {
  const source = axios.CancelToken.source();

  // Fetching popular movies
  const popularMovies = useQuery('popularMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending movies
  const trendingMovies = useQuery('trendingMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/trending/movie/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching popular TV
  const popularTV = useQuery('popularTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending TV
  const trendingTV = useQuery('trendingTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/trending/tv/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching trending People
  const trendingPeople = useQuery('trendingPeople', async () => {
    const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/trending/person/day', {
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
        title='Popular movies'
        isLoading={popularMovies.isFetching || popularMovies.isLoading}
        path={{ pathname: '/movies/popular' }}>
        <HorizontalMovies
          isError={popularMovies.isError}
          isSuccess={popularMovies.isSuccess && !popularMovies.isFetching && !popularMovies.isLoading}
          movies={popularMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Trending movies'
        isLoading={trendingMovies.isFetching || trendingMovies.isLoading}
        path={{ pathname: '/trending/movie' }}>
        <HorizontalMovies
          isError={trendingMovies.isError}
          isSuccess={trendingMovies.isSuccess && !trendingMovies.isFetching && !trendingMovies.isLoading}
          movies={trendingMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Popular TV'
        isLoading={popularTV.isFetching || popularTV.isLoading}
        path={{ pathname: '/tv/popular' }}>
        <HorizontalTV
          isError={popularTV.isError}
          isSuccess={popularTV.isSuccess && !popularTV.isFetching && !popularTV.isLoading}
          tv={popularTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Trending TV'
        isLoading={trendingTV.isFetching || trendingTV.isLoading}
        path={{ pathname: '/trending/tv' }}>
        <HorizontalTV
          isError={trendingTV.isError}
          isSuccess={trendingTV.isSuccess && !trendingTV.isFetching && !trendingTV.isLoading}
          tv={trendingTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Trending People'
        isLoading={trendingPeople.isFetching || trendingPeople.isLoading}
        path={{ pathname: '/trending/person' }}>
        <HorizontalPeople
          isError={trendingPeople.isError}
          isSuccess={trendingPeople.isSuccess && !trendingPeople.isFetching && !trendingPeople.isLoading}
          people={trendingPeople.data}
        />
      </HorizontalGrid>
    </VStack>
  );
};

export default Home;
