import React, { ReactElement } from 'react';

import useSelector from '../../../common/hooks/useSelectorTyped';
import { PartialMovie } from '../../../common/types/movie';
import utils from '../../../common/utils/utils';
import Empty from '../../Empty';
import Error from '../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { MovieProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const HorizontalMovies = ({ isLoading, isError, isSuccess, movies }: MovieProps): ReactElement => {
  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);

  return isLoading && hasOptionsDownloaded ? (
    <>
      {[...Array(movies ? movies.length : 20)].map((_dummy, index: number) => (
        <VerticalPoster
          key={index}
          width={['185px']}
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
      ))}
    </>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='transparent' />
  ) : isSuccess && movies && movies.length > 0 ? (
    <>
      {movies.map((movie: PartialMovie, index: number) => (
        <VerticalPoster
          key={index}
          width={['185px']}
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
          title={movie?.title || 'N/A'}
          subtitle={`${utils.handleReturnDate(movie?.release_date || '', 'year')}${
            movie?.release_date && movie?.genre_ids ? ' • ' : ''
          }${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
          isLoaded={true}
        />
      ))}
    </>
  ) : (
    <Empty label='Movies list is currently empty!' variant='transparent' />
  );
};

export default HorizontalMovies;
