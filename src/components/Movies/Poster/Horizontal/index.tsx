import React, { ReactElement } from 'react';

import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../Poster/Horizontal';
import { PosterProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const HorizontalMovie = ({ isLoading = true, movie }: PosterProps): ReactElement => {
  return !isLoading && movie ? (
    <HorizontalPoster
      mediaItem={{ ...movie }}
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
      subtitle={`${[
        `${utils.handleReturnDate(movie?.release_date || '', 'full')}`,
        `${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`
      ].join(' • ')}`}
      description={movie?.overview || ''}
      isLoaded
    />
  ) : (
    <HorizontalPoster
      mediaType='movie'
      image={{
        alt: 'Movie poster',
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

export default HorizontalMovie;
