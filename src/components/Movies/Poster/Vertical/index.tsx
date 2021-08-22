import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import VerticalPoster from '../../../Poster/Vertical';
import { PosterProps } from '../types';

const VerticalMovie = ({ width, isLoading = true, movie }: PosterProps): ReactElement => {
  return (
    <VerticalPoster
      width={width || ['185px', '205px', '230px']}
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
      ].join(' • ')}`}
      isLoading={isLoading}
    />
  );
};

export default VerticalMovie;
