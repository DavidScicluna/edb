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
        title='Trending movies'
        isLoading={trendingMovies.isLoading || trendingMovies.isFetching}
        path={{ pathname: '/trending/movie' }}>
        <HorizontalMovies
          isLoading={trendingMovies.isLoading || trendingMovies.isFetching}
          isError={trendingMovies.isError}
          isSuccess={trendingMovies.isSuccess}
          movies={trendingMovies.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Popular TV'
        isLoading={popularTV.isLoading || popularTV.isFetching}
        path={{ pathname: '/tv/popular' }}>
        <HorizontalTV
          isLoading={popularTV.isLoading || popularTV.isFetching}
          isError={popularTV.isError}
          isSuccess={popularTV.isSuccess}
          tv={popularTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Trending TV'
        isLoading={trendingTV.isLoading || trendingTV.isFetching}
        path={{ pathname: '/trending/tv' }}>
        <HorizontalTV
          isLoading={trendingTV.isLoading || trendingTV.isFetching}
          isError={trendingTV.isError}
          isSuccess={trendingTV.isSuccess}
          tv={trendingTV.data}
        />
      </HorizontalGrid>

      <HorizontalGrid
        title='Trending People'
        isLoading={trendingPeople.isLoading || trendingPeople.isFetching}
        path={{ pathname: '/trending/person' }}>
        <HorizontalPeople
          isLoading={trendingPeople.isLoading || trendingPeople.isFetching}
          isError={trendingPeople.isError}
          isSuccess={trendingPeople.isSuccess}
          people={trendingPeople.data}
        />
      </HorizontalGrid>
    </VStack>
  );
};

export default Home;
