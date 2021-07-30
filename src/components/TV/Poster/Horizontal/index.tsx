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
        size: '780'
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
  // ) : (
  //   <HorizontalPoster
  //     mediaType='tv'
  //     image={{
  //       alt: 'TV Show poster',
  //       src: '',
  //       size: '780'
  //     }}
  //     title='Lorem ipsum'
  //     subtitle='Lorem ipsum'
  //     description='Lorem ipsum'
  //     isLoaded={false}
  //   />
  // );
};

export default HorizontalTV;
