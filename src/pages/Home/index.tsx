import React, { ReactElement, useEffect } from 'react';

import { VStack, Box } from '@chakra-ui/react';
import axios from 'axios';
import queryString from 'query-string';
import { useQuery } from 'react-query';

import useSelectorTyped from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Empty from '../../components/Empty';
import Error from '../../components/Error';
import HorizontalGrid from '../../components/Grid/Horizontal';
import VerticalPoster from '../../components/Poster/Vertical';

const Home = (): ReactElement => {
  const source = axios.CancelToken.source();

  const hasOptionsDownloaded = useSelectorTyped((state) => state.options.data.hasDownloaded);

  // Fetching popular movies
  const popularMovies = useQuery('popularMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching popular movies
  const trendingMovies = useQuery('trendingMovies', async () => {
    const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/trending/movie/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching popular movies
  const popularTV = useQuery('popularTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/tv/popular', {
      cancelToken: source.token
    });
    return data.results;
  });

  // Fetching popular movies
  const trendingTV = useQuery('trendingTV', async () => {
    const { data } = await axiosInstance.get<Response<PartialTV[]>>('/trending/tv/day', {
      cancelToken: source.token
    });
    return data.results;
  });

  const size = utils.handleReturnImageSize('poster', 'sm');

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VStack backgroundColor='gray.100' spacing={6}>
      {/* Popular Movies */}
      <Box maxWidth='100%' backgroundColor='white'>
        <HorizontalGrid title='Popular movies' path={{ pathname: '/movies/popular' }}>
          <>
            {/* {popularMovies.isLoading || !hasOptionsDownloaded ? ( */}
            {popularMovies.isLoading || !hasOptionsDownloaded ? (
              [...Array(10)].map((_dummy, index) => (
                <VerticalPoster
                  key={index}
                  type='movie'
                  image={{
                    alt: 'Movie poster',
                    src: '',
                    size
                    // fallback?: ReactElement;
                  }}
                  title=''
                  subtitle=''
                  isLoaded={false}
                />
              ))
            ) : popularMovies.isError ? (
              <Error label='Failed to fetch popular movies list!' />
            ) : popularMovies.isSuccess ? (
              popularMovies.data.map((movie: PartialMovie, index) => (
                <VerticalPoster
                  key={index}
                  type='movie'
                  image={{
                    alt: `${movie.title} movie poster`,
                    src: movie.poster_path || '',
                    size
                    // fallback?: ReactElement;
                  }}
                  rating={{
                    rating: movie.vote_average,
                    count: movie.vote_count
                  }}
                  title={movie.title}
                  subtitle={`${utils.handleReturnDate(movie.release_date, 'year')} • ${utils.handleReturnGenresByID(
                    movie.genre_ids,
                    'movie'
                  )}`}
                  isLoaded={true}
                />
              ))
            ) : (
              <Empty label='Popular movies list is empty!' />
            )}
          </>
        </HorizontalGrid>
      </Box>

      {/* Trending Movies */}
      <Box maxWidth='100%' backgroundColor='white'>
        <HorizontalGrid
          title='Trending movies'
          path={{ pathname: '/trending', search: queryString.stringify({ type: 'movie' }) }}>
          <>
            {trendingMovies.isLoading || !hasOptionsDownloaded ? (
              [...Array(10)].map((_dummy, index) => (
                <VerticalPoster
                  key={index}
                  type='movie'
                  image={{
                    alt: 'Movie poster',
                    src: '',
                    size
                    // fallback?: ReactElement;
                  }}
                  title=''
                  subtitle=''
                  isLoaded={false}
                />
              ))
            ) : trendingMovies.isError ? (
              <Error label='Failed to fetch trending movies list!' />
            ) : trendingMovies.isSuccess ? (
              trendingMovies.data.map((movie: PartialMovie, index) => (
                <VerticalPoster
                  key={index}
                  type='movie'
                  image={{
                    alt: `${movie.title} movie poster`,
                    src: movie.poster_path || '',
                    size
                    // fallback?: ReactElement;
                  }}
                  rating={{
                    rating: movie.vote_average,
                    count: movie.vote_count
                  }}
                  title={movie.title}
                  subtitle={`${utils.handleReturnDate(movie.release_date, 'year')} • ${utils.handleReturnGenresByID(
                    movie.genre_ids,
                    'movie'
                  )}`}
                  isLoaded={true}
                />
              ))
            ) : (
              <Empty label='Trending movies list is empty!' />
            )}
          </>
        </HorizontalGrid>
      </Box>

      {/* Popular TV */}
      <Box maxWidth='100%' backgroundColor='white'>
        <HorizontalGrid title='Popular TV' path={{ pathname: '/tv/popular' }}>
          <>
            {popularTV.isLoading || !hasOptionsDownloaded ? (
              [...Array(10)].map((_dummy, index) => (
                <VerticalPoster
                  key={index}
                  type='tv'
                  image={{
                    alt: 'TV poster',
                    src: '',
                    size
                    // fallback?: ReactElement;
                  }}
                  title=''
                  subtitle=''
                  isLoaded={false}
                />
              ))
            ) : popularTV.isError ? (
              <Error label='Failed to fetch popular TV list!' />
            ) : popularTV.isSuccess ? (
              popularTV.data.map((tv: PartialTV, index) => (
                <VerticalPoster
                  key={index}
                  type='tv'
                  image={{
                    alt: `${tv.name} TV poster`,
                    src: tv.poster_path || '',
                    size
                    // fallback?: ReactElement;
                  }}
                  rating={{
                    rating: tv.vote_average,
                    count: tv.vote_count
                  }}
                  title={tv.name}
                  subtitle={`${utils.handleReturnDate(tv.first_air_date, 'year')} • ${utils.handleReturnGenresByID(
                    tv.genre_ids,
                    'movie'
                  )}`}
                  isLoaded={true}
                />
              ))
            ) : (
              <Empty label='Popular TV list is empty!' />
            )}
          </>
        </HorizontalGrid>
      </Box>

      {/* Trending TV */}
      <Box maxWidth='100%' backgroundColor='white'>
        <HorizontalGrid
          title='Trending TV'
          path={{ pathname: '/trending', search: queryString.stringify({ type: 'tv' }) }}>
          <>
            {trendingTV.isLoading || !hasOptionsDownloaded ? (
              [...Array(10)].map((_dummy, index) => (
                <VerticalPoster
                  key={index}
                  type='tv'
                  image={{
                    alt: 'TV poster',
                    src: '',
                    size
                    // fallback?: ReactElement;
                  }}
                  title=''
                  subtitle=''
                  isLoaded={false}
                />
              ))
            ) : trendingTV.isError ? (
              <Error label='Failed to fetch trending TV list!' />
            ) : trendingTV.isSuccess ? (
              trendingTV.data.map((tv: PartialTV, index) => (
                <VerticalPoster
                  key={index}
                  type='tv'
                  image={{
                    alt: `${tv.name} TV poster`,
                    src: tv.poster_path || '',
                    size
                    // fallback?: ReactElement;
                  }}
                  rating={{
                    rating: tv.vote_average,
                    count: tv.vote_count
                  }}
                  title={tv.name}
                  subtitle={`${utils.handleReturnDate(tv.first_air_date, 'year')} • ${utils.handleReturnGenresByID(
                    tv.genre_ids,
                    'movie'
                  )}`}
                  isLoaded={true}
                />
              ))
            ) : (
              <Empty label='Trending TV list is empty!' />
            )}
          </>
        </HorizontalGrid>
      </Box>
    </VStack>
  );
};

export default Home;
