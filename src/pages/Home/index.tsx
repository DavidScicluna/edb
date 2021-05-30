import React, { ReactElement, useEffect } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';

import useSelectorTyped from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { Response } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Empty from '../../components/Empty';
import Error from '../../components/Error';
import VerticalGrid from '../../components/Grid/Vertical';
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

  const size = utils.handleReturnImageSize('poster', 'sm');

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VerticalGrid title='Popular movies' path='/movies/popular'>
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
    </VerticalGrid>
  );
};

export default Home;
