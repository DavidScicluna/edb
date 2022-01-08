import React, { ReactElement } from 'react';

import { handleReturnDate, handleReturnGenresByID } from '../../../../../common/utils';
import HorizontalPoster from '../../../../../components/Poster/Horizontal';
import { HorizontalMoviePosterProps } from './types';

const HorizontalMoviePoster = (props: HorizontalMoviePosterProps): ReactElement => {
  const { movie, isLoading = true } = props;
  const { title, poster_path, vote_average, vote_count, overview, release_date, genre_ids } = movie || {};

  return (
    <HorizontalPoster
      mediaItem={movie ? { ...movie } : undefined}
      mediaType='movie'
      image={{
        alt: `${title || ''} movie poster`,
        src: poster_path || '',
        size: {
          thumbnail: 'w92',
          full: 'original'
        }
      }}
      rating={{
        rating: vote_average || null,
        count: vote_count || null
      }}
      title={title || ''}
      subtitle={`${[
        `${handleReturnDate(release_date || '', 'full')}` || 'N/A',
        `${handleReturnGenresByID(genre_ids || [], 'movie')}`
      ]
        .filter((subtitle) => subtitle)
        .join(' • ')}`}
      description={overview || ''}
      isLoading={isLoading}
    />
  );
};

export default HorizontalMoviePoster;
