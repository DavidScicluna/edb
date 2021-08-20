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
        `${utils.handleReturnDate(movie?.release_date || '', 'full')}`,
        `${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`
      ].join(' • ')}`}
      description={movie?.overview || ''}
      isLoading={isLoading}
    />
  );
};

export default HorizontalMovie;
