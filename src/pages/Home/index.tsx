import React, { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import Page from '../../containers/Page';
import HorizontalMovies from '../Movies/components/HorizontalMovies';
import HorizontalPeople from '../People/components/HorizontalPeople';
import HorizontalTV from '../TV/components/HorizontalTV';
import HorizontalGrid from './components/HorizontalGrid';

const Home = (): ReactElement => {
  const source = axios.CancelToken.source();

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

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='Home' breadcrumbs={[]}>
      {{
        body: (
          <VStack spacing={6}>
            <HorizontalGrid
              title='Popular movies'
              pathname='/movies/popular'
              isLoading={popularMoviesQuery.isFetching || popularMoviesQuery.isLoading}>
              <HorizontalMovies
                isError={popularMoviesQuery.isError}
                isSuccess={popularMoviesQuery.isSuccess}
                isLoading={popularMoviesQuery.isFetching || popularMoviesQuery.isLoading}
                movies={popularMoviesQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title='Trending movies'
              pathname='/trending/movie'
              isLoading={trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading}>
              <HorizontalMovies
                isError={trendingMoviesQuery.isError}
                isSuccess={trendingMoviesQuery.isSuccess}
                isLoading={trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading}
                movies={trendingMoviesQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title='Popular TV shows'
              pathname='/tv/popular'
              isLoading={popularTVQuery.isFetching || popularTVQuery.isLoading}>
              <HorizontalTV
                isError={popularTVQuery.isError}
                isSuccess={popularTVQuery.isSuccess}
                isLoading={popularTVQuery.isFetching || popularTVQuery.isLoading}
                tv={popularTVQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title='Trending TV shows'
              pathname='/trending/tv'
              isLoading={trendingTVQuery.isFetching || trendingTVQuery.isLoading}>
              <HorizontalTV
                isError={trendingTVQuery.isError}
                isSuccess={trendingTVQuery.isSuccess}
                isLoading={trendingTVQuery.isFetching || trendingTVQuery.isLoading}
                tv={trendingTVQuery.data}
              />
            </HorizontalGrid>

            <HorizontalGrid
              title='Trending People'
              pathname='/trending/person'
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
