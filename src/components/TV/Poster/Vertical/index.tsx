import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { PosterProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const VerticalTV = ({ width, isLoading = true, show }: PosterProps): ReactElement => {
  return !isLoading && show ? (
    <VerticalPoster
      width={width || ['185px', '205px', '230px']}
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
        `${utils.handleReturnDate(show?.first_air_date || '', 'year')}`,
        `${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`
      ].join(' • ')}`}
      isLoaded={true}
    />
  ) : (
    <VerticalPoster
      width={width || ['185px', '205px', '230px']}
      mediaType='tv'
      image={{
        alt: 'TV Show poster',
        src: '',
        size
      }}
      title='Lorem ipsum'
      subtitle='Lorem ipsum'
      isLoaded={false}
    />
  );
};

export default VerticalTV;
