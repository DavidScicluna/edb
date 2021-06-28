import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import { PosterProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const HorizontalTV = ({ isLoading = true, show }: PosterProps): ReactElement => {
  return !isLoading && show ? (
    <HorizontalPoster
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
      subtitle={`${utils.handleReturnDate(show?.first_air_date || '', 'full')}${
        show?.first_air_date && show?.genre_ids ? ' • ' : ''
      }${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`}
      description={show?.overview || ''}
      isLoaded={true}
    />
  ) : (
    <HorizontalPoster
      mediaItemID={-1}
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
