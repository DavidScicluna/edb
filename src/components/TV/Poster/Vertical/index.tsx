import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { PosterProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const VerticalTV = ({ width, isLoading = true, show }: PosterProps): ReactElement => {
  return !isLoading && show ? (
    <VerticalPoster
      width={width || ['185px']}
      mediaItemID={show.id}
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
      subtitle={`${utils.handleReturnDate(show?.first_air_date || '', 'year')}${
        show?.first_air_date && show?.genre_ids ? ' • ' : ''
      }${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`}
      isLoaded={true}
    />
  ) : (
    <VerticalPoster
      width={width || ['185px']}
      mediaItemID={-1}
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
