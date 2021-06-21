import React, { ReactElement, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import queryString from 'query-string';
import { useQuery } from 'react-query';

import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Empty from '../../components/Empty';
import Error from '../../components/Error';
import HorizontalGrid from '../../components/Grid/Horizontal';
import VerticalPoster from '../../components/Poster/Vertical';

const size = utils.handleReturnImageSize('poster', 'sm');

const Home = (): ReactElement => {
  const source = axios.CancelToken.source();

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);

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
      {/* Popular Movies */}
      <HorizontalGrid
        title='Popular movies'
        isLoading={popularMovies.isLoading || popularMovies.isFetching}
        path={{ pathname: '/movies/popular' }}>
        <>
          {popularMovies.isLoading || popularMovies.isFetching || !hasOptionsDownloaded ? (
            [...Array(10)].map((_dummy, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='movie'
                image={{
                  alt: 'Movie poster',
                  src: '',
                  size
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                isLoaded={false}
              />
            ))
          ) : popularMovies.isError ? (
            <Error label='Failed to fetch popular movies list!' variant='outlined' />
          ) : popularMovies.isSuccess ? (
            popularMovies.data.map((movie: PartialMovie, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='movie'
                image={{
                  alt: `${movie.title} movie poster`,
                  src: movie.poster_path || '',
                  size
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
            <Empty label='Popular movies list is empty!' variant='outlined' />
          )}
        </>
      </HorizontalGrid>

      {/* Trending Movies */}
      <HorizontalGrid
        title='Trending movies'
        isLoading={trendingMovies.isLoading || trendingMovies.isFetching}
        path={{ pathname: '/trending', search: queryString.stringify({ mediaType: 'movie' }) }}>
        <>
          {trendingMovies.isLoading || trendingMovies.isFetching || !hasOptionsDownloaded ? (
            [...Array(10)].map((_dummy, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='movie'
                image={{
                  alt: 'Movie poster',
                  src: '',
                  size
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                isLoaded={false}
              />
            ))
          ) : trendingMovies.isError ? (
            <Error label='Failed to fetch trending movies list!' variant='outlined' />
          ) : trendingMovies.isSuccess ? (
            trendingMovies.data.map((movie: PartialMovie, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='movie'
                image={{
                  alt: `${movie.title} movie poster`,
                  src: movie.poster_path || '',
                  size
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
            <Empty label='Trending movies list is empty!' variant='outlined' />
          )}
        </>
      </HorizontalGrid>

      {/* Popular TV */}
      <HorizontalGrid
        title='Popular TV'
        isLoading={popularTV.isLoading || popularTV.isFetching}
        path={{ pathname: '/tv/popular' }}>
        <>
          {popularTV.isLoading || popularTV.isFetching || !hasOptionsDownloaded ? (
            [...Array(10)].map((_dummy, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='tv'
                image={{
                  alt: 'TV poster',
                  src: '',
                  size
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                isLoaded={false}
              />
            ))
          ) : popularTV.isError ? (
            <Error label='Failed to fetch popular TV list!' variant='outlined' />
          ) : popularTV.isSuccess ? (
            popularTV.data.map((tv: PartialTV, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='tv'
                image={{
                  alt: `${tv.name} TV poster`,
                  src: tv.poster_path || '',
                  size
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
            <Empty label='Popular TV list is empty!' variant='outlined' />
          )}
        </>
      </HorizontalGrid>

      {/* Trending TV */}
      <HorizontalGrid
        title='Trending TV'
        isLoading={trendingTV.isLoading || trendingTV.isFetching}
        path={{ pathname: '/trending', search: queryString.stringify({ mediaType: 'tv' }) }}>
        <>
          {trendingTV.isLoading || trendingTV.isFetching || !hasOptionsDownloaded ? (
            [...Array(10)].map((_dummy, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='tv'
                image={{
                  alt: 'TV poster',
                  src: '',
                  size
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                isLoaded={false}
              />
            ))
          ) : trendingTV.isError ? (
            <Error label='Failed to fetch trending TV list!' variant='outlined' />
          ) : trendingTV.isSuccess ? (
            trendingTV.data.map((tv: PartialTV, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='tv'
                image={{
                  alt: `${tv.name} TV poster`,
                  src: tv.poster_path || '',
                  size
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
            <Empty label='Trending TV list is empty!' variant='outlined' />
          )}
        </>
      </HorizontalGrid>

      {/* Trending People */}
      <HorizontalGrid
        title='Trending People'
        isLoading={trendingPeople.isLoading || trendingPeople.isFetching}
        path={{ pathname: '/trending', search: queryString.stringify({ mediaType: 'person' }) }}>
        <>
          {trendingPeople.isLoading || trendingPeople.isFetching || !hasOptionsDownloaded ? (
            [...Array(10)].map((_dummy, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='person'
                image={{
                  alt: 'Person poster',
                  src: '',
                  size
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                isLoaded={false}
              />
            ))
          ) : trendingPeople.isError ? (
            <Error label='Failed to fetch trending People list!' variant='outlined' />
          ) : trendingPeople.isSuccess ? (
            trendingPeople.data.map((person: PartialPerson, index) => (
              <VerticalPoster
                key={index}
                width={['185px']}
                mediaType='person'
                image={{
                  alt: `${person.name} person poster`,
                  src: person.profile_path || '',
                  size
                }}
                title={person.name}
                subtitle={person.known_for_department}
                isLoaded={true}
              />
            ))
          ) : (
            <Empty label='Trending People list is empty!' variant='outlined' />
          )}
        </>
      </HorizontalGrid>
    </VStack>
  );
};

export default Home;
