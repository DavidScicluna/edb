import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { PosterProps } from '../types';

const VerticalTV = ({ width, isLoading = true, show }: PosterProps): ReactElement => {
  return (
    <VerticalPoster
      width={width || ['185px', '205px', '230px']}
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
        `${utils.handleReturnDate(show?.first_air_date || '', 'year')}`,
        `${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`
      ].join(' • ')}`}
      isLoading={isLoading}
    />
  );
};

export default VerticalTV;
