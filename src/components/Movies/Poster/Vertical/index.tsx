import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import VerticalPoster from '../../../Poster/Vertical';
import { PosterProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const VerticalMovie = ({ width, isLoading = true, movie }: PosterProps): ReactElement => {
  return !isLoading && movie ? (
    <VerticalPoster
      width={width || ['185px']}
      mediaItemID={movie.id}
      mediaType='movie'
      image={{
        alt: `${movie?.title || ''} movie poster`,
        src: movie?.poster_path || '',
        size
      }}
      rating={{
        rating: movie?.vote_average || null,
        count: movie?.vote_count || null
      }}
      title={movie?.title || ''}
      subtitle={`${utils.handleReturnDate(movie?.release_date || '', 'year')}${
        movie?.release_date && movie?.genre_ids ? ' • ' : ''
      }${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
      isLoaded={true}
    />
  ) : (
    <VerticalPoster
      width={width || ['185px']}
      mediaItemID={-1}
      mediaType='movie'
      image={{
        alt: 'Movie poster',
        src: '',
        size
      }}
      title='Lorem ipsum'
      subtitle='Lorem ipsum'
      isLoaded={false}
    />
  );
};

export default VerticalMovie;
