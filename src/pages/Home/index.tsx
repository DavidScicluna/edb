import { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import qs from 'query-string';
import { useQuery } from 'react-query';

import axiosInstance from '../../common/scripts/axios';
import { Response } from '../../common/types';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import Page from '../../containers/Page';
import HomeHorizontalGrid from './components/HorizontalGrid';

const Home = (): ReactElement => {
  const source = axios.CancelToken.source();

  // Fetching Popular Movies
  const popularMoviesQuery = useQuery('popular-movies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching Popular TV Shows
  const popularTVQuery = useQuery('popular-tv-shows', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/popular', {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching Top Rated Movies
  const topRatedMoviesQuery = useQuery('top-rated-movies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/top_rated', {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching Top Rated TV Shows
  const topRatedTVQuery = useQuery('top-rated-tv-shows', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/top_rated', {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching Trending Movies
  const trendingMoviesQuery = useQuery('trending-movies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/trending/movie/day', {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching Trending TV Shows
  const trendingTVQuery = useQuery('trending-tv-shows', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/trending/tv/day', {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching Trending People
  const trendingPeopleQuery = useQuery('trending-people', async () => {
    const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/trending/person/day', {
      cancelToken: source.token
    });
    return data;
  });

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page>
      {{
        body: (
          <VStack px={2} pt={4} spacing={4}>
            <HomeHorizontalGrid
              title='Popular'
              to={({ mediaType }) => {
                if (mediaType === 'movie') {
                  return { pathname: '/movies', search: qs.stringify({ sort_by: 'popularity.desc' }) };
                } else {
                  return { pathname: '/tv', search: qs.stringify({ sort_by: 'popularity.desc' }) };
                }
              }}
              mediaTypes={['movie', 'tv']}
              data={{
                movie: popularMoviesQuery.data?.results || [],
                tv: popularTVQuery.data?.results || []
              }}
              isLoading={{
                movie: popularMoviesQuery.isFetching || popularMoviesQuery.isLoading,
                tv: popularTVQuery.isFetching || popularTVQuery.isLoading
              }}
              isError={{
                movie: popularMoviesQuery.isError,
                tv: popularTVQuery.isError
              }}
              isSuccess={{
                movie: popularMoviesQuery.isSuccess,
                tv: popularTVQuery.isSuccess
              }}
            />

            <HomeHorizontalGrid
              title='Top Rated'
              to={({ mediaType }) => {
                if (mediaType === 'movie') {
                  return {
                    pathname: '/movies',
                    search: qs.stringify({ sort_by: 'vote_average.desc' })
                  };
                } else {
                  return {
                    pathname: '/tv',
                    search: qs.stringify({ sort_by: 'vote_average.desc' })
                  };
                }
              }}
              mediaTypes={['movie', 'tv']}
              data={{
                movie: topRatedMoviesQuery.data?.results || [],
                tv: topRatedTVQuery.data?.results || []
              }}
              isLoading={{
                movie: topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading,
                tv: topRatedTVQuery.isFetching || topRatedTVQuery.isLoading
              }}
              isError={{
                movie: topRatedMoviesQuery.isError,
                tv: topRatedTVQuery.isError
              }}
              isSuccess={{
                movie: topRatedMoviesQuery.isSuccess,
                tv: topRatedTVQuery.isSuccess
              }}
            />

            <HomeHorizontalGrid
              title='Trending'
              to={({ mediaType }) => {
                return { pathname: '/trending', hash: mediaType };
              }}
              mediaTypes={['movie', 'tv', 'person']}
              data={{
                movie: trendingMoviesQuery.data?.results || [],
                tv: trendingTVQuery.data?.results || [],
                person: trendingPeopleQuery.data?.results || []
              }}
              isLoading={{
                movie: trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading,
                tv: trendingTVQuery.isFetching || trendingTVQuery.isLoading,
                person: trendingPeopleQuery.isFetching || trendingPeopleQuery.isLoading
              }}
              isError={{
                movie: trendingMoviesQuery.isError,
                tv: trendingTVQuery.isError,
                person: trendingPeopleQuery.isError
              }}
              isSuccess={{
                movie: trendingMoviesQuery.isSuccess,
                tv: trendingTVQuery.isSuccess,
                person: trendingPeopleQuery.isSuccess
              }}
            />
          </VStack>
        )
      }}
    </Page>
  );
};

export default Home;
