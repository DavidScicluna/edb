import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../Poster/Horizontal';
import { PosterProps } from '../types';

const HorizontalMovie = ({ isLoading = true, movie }: PosterProps): ReactElement => {
  return (
    <HorizontalPoster
      mediaItem={movie ? { ...movie } : undefined}
      mediaType='movie'
      image={{
        alt: `${movie?.title || ''} movie poster`,
        src: movie?.poster_path || '',
        size: '780'
      }}
      rating={{
        rating: movie?.vote_average || null,
        count: movie?.vote_count || null
      }}
      title={movie?.title || ''}
      subtitle={`${[
        `${utils.handleReturnDate(movie?.release_date || '', 'full')}`,
        `${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`
      ].join(' • ')}`}
      description={movie?.overview || ''}
      isLoading={isLoading}
    />
  );
  // ) : (
  //   <HorizontalPoster
  //     mediaType='movie'
  //     image={{
  //       alt: 'Movie poster',
  //       src: '',
  //       size: '780'
  //     }}
  //     title='Lorem ipsum'
  //     subtitle='Lorem ipsum'
  //     description='Lorem ipsum'
  //     isLoading
  //   />
  // );
};

export default HorizontalMovie;
