import React, { ReactElement } from 'react';

import _ from 'lodash';

import { PartialMovie } from '../../../../common/types/movie';
import utils from '../../../../common/utils/utils';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { HorizontalMoviesProps } from './types';

const HorizontalMovies = (props: HorizontalMoviesProps): ReactElement => {
  const { isError = false, isSuccess = false, isLoading = true, movies } = props;

  return !isLoading && isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='transparent' />
  ) : !isLoading && isSuccess && movies && movies.length === 0 ? (
    <Empty label='Movies list is currently empty!' variant='transparent' />
  ) : !isLoading && isSuccess && movies && movies.length > 0 ? (
    <>
      {movies.map((movie: PartialMovie) => (
        <VerticalPoster
          key={movie.id}
          width={['185px', '205px', '230px']}
          mediaItem={movie ? { ...movie } : undefined}
          mediaType='movie'
          image={{
            alt: `${movie?.title || ''} movie poster`,
            src: movie?.poster_path || '',
            size: {
              thumbnail: 'w92',
              full: 'original'
            }
          }}
          rating={{
            rating: movie?.vote_average || null,
            count: movie?.vote_count || null
          }}
          title={movie?.title || ''}
          subtitle={`${[
            `${utils.handleReturnDate(movie?.release_date || '', 'year')}`,
            `${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`
          ]
            .filter((subtitle) => subtitle)
            .join(' • ')}`}
          isLoading={isLoading}
        />
      ))}
    </>
  ) : (
    <>
      {_.range(0, 20).map((_dummy, index: number) => (
        <VerticalPoster
          key={index}
          width={['185px', '205px', '230px']}
          mediaType='movie'
          image={{
            alt: 'Movie poster',
            src: '',
            size: {
              thumbnail: 'w92',
              full: 'original'
            }
          }}
          title='Lorem ipsum'
          subtitle='2021 • Lorem ipsum dolor sit amet'
          isLoading
        />
      ))}
    </>
  );
};

export default HorizontalMovies;
