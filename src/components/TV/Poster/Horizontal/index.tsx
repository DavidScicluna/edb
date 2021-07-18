import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import { PosterProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const HorizontalTV = ({ isLoading = true, show }: PosterProps): ReactElement => {
  return !isLoading && show ? (
    <HorizontalPoster
      mediaItem={{ ...show }}
      mediaType='tv'
      image={{
        alt: `${show?.name || ''} tv show poster`,
        src: show?.poster_path || '',
        size
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
      isLoaded={true}
    />
  ) : (
    <HorizontalPoster
      mediaType='tv'
      image={{
        alt: 'TV Show poster',
        src: '',
        size
      }}
      title='Lorem ipsum'
      subtitle='Lorem ipsum'
      description='Lorem ipsum'
      isLoaded={false}
    />
  );
};

export default HorizontalTV;
