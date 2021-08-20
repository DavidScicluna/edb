import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import { PosterProps } from '../types';

const HorizontalTV = ({ isLoading = true, show }: PosterProps): ReactElement => {
  return (
    <HorizontalPoster
      mediaItem={show ? { ...show } : undefined}
      mediaType='tv'
      image={{
        alt: `${show?.name || ''} tv show poster`,
        src: show?.poster_path || '',
        size: {
          thumbnail: 'w92',
          full: 'original'
        }
      }}
      rating={{
        rating: show?.vote_average || null,
        count: show?.vote_count || null
      }}
      title={show?.name || ''}
      subtitle={`${[
        `${utils.handleReturnDate(show?.first_air_date || '', 'full')}`,
        `${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`
      ].join(' • ')}`}
      description={show?.overview || ''}
      isLoading={isLoading}
    />
  );
};

export default HorizontalTV;
