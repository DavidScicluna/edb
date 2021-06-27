import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import useSelector from '../../../common/hooks/useSelectorTyped';
import { PartialMovie } from '../../../common/types/movie';
import utils from '../../../common/utils/utils';
import Empty from '../../Empty';
import Error from '../../Error';
import HorizontalPoster from '../../Poster/Horizontal';
import VerticalPoster from '../../Poster/Vertical';
import { MovieProps } from '../types';

const size = utils.handleReturnImageSize('poster', 'sm');

const VerticalMovies = ({ isLoading, isError, isSuccess, movies }: MovieProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);

  return isLoading && hasOptionsDownloaded ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
      {[...Array(movies ? movies.length : 20)].map((_dummy, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={index}
            mediaItemID={-1}
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
        ) : (
          <VerticalPoster
            key={index}
            width='100%'
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
        )
      )}
    </SimpleGrid>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='outlined' />
  ) : isSuccess && movies && movies.length > 0 ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
      {movies.map((movie: PartialMovie, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={index}
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
            subtitle={`${utils.handleReturnDate(movie?.release_date || '', 'full')}${
              movie?.release_date && movie?.genre_ids ? ' • ' : ''
            }${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
            description={movie?.overview || ''}
            isLoaded={true}
          />
        ) : (
          <VerticalPoster
            key={index}
            width='100%'
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
        )
      )}
    </SimpleGrid>
  ) : (
    <Empty label='Movies list is currently empty!' variant='outlined' />
  );
};

export default VerticalMovies;
