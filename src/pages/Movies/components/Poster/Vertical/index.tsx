import React, { ReactElement } from 'react';

import { handleReturnDate, handleReturnGenresByID } from '../../../../../common/utils';
import VerticalPoster from '../../../../../components/Poster/Vertical';
import { VerticalMoviePosterProps } from './types';

const VerticalMoviePoster = (props: VerticalMoviePosterProps): ReactElement => {
  const { movie, isLoading = true } = props;
  const { title, poster_path, vote_average, release_date, genre_ids } = movie || {};

  return (
    <VerticalPoster
      width={['185px', '205px', '230px']}
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
      rating={vote_average || null}
      title={title || ''}
      subtitle={`${[
        `${handleReturnDate(release_date || '', 'year')} ` || 'N/A',
        `${handleReturnGenresByID(genre_ids || [], 'movie')}`
      ]
        .filter((subtitle) => subtitle)
        .join(' • ')}`}
      isLoading={isLoading}
    />
  );
};

export default VerticalMoviePoster;
