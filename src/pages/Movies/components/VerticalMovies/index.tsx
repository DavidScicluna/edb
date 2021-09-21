import { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../common/hooks';
import { PartialMovie } from '../../../../common/types/movie';
import { handleReturnDate, handleReturnGenresByID } from '../../../../common/utils';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { VerticalMoviesProps } from './types';

const VerticalMovies = (props: VerticalMoviesProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 320px)');

  const displayMode = useSelector((state) => state.app.ui.displayMode);

  const { isError = false, isSuccess = false, isLoading = true, movies } = props;

  return !isLoading && isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='outlined' />
  ) : !isLoading && isSuccess && movies && movies.length === 0 ? (
    <Empty label='Movies list is currently empty!' variant='outlined' />
  ) : !isLoading && isSuccess && movies && movies.length > 0 ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]} spacing={2}>
      {movies.map((movie: PartialMovie) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={movie.id}
            mediaItem={movie ? { ...movie } : undefined}
            mediaType='movie'
            image={{
              alt: `${movie?.title || ''} movie poster`,
              src: movie?.poster_path || '',
              size: {
                thumbnail: 'w92',
                full: 'original'
              }
            }}
            rating={{
              rating: movie?.vote_average || null,
              count: movie?.vote_count || null
            }}
            title={movie?.title || ''}
            subtitle={`${[
              `${handleReturnDate(movie?.release_date || '', 'full')}` || 'N/A',
              `${handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`
            ]
              .filter((subtitle) => subtitle)
              .join(' • ')}`}
            description={movie?.overview || ''}
            isLoading={isLoading}
          />
        ) : (
          <VerticalPoster
            key={movie.id}
            width='100%'
            mediaItem={movie ? { ...movie } : undefined}
            mediaType='movie'
            image={{
              alt: `${movie?.title || ''} movie poster`,
              src: movie?.poster_path || '',
              size: {
                thumbnail: 'w92',
                full: 'original'
              }
            }}
            rating={{
              rating: movie?.vote_average || null,
              count: movie?.vote_count || null
            }}
            title={movie?.title || ''}
            subtitle={`${[
              `${handleReturnDate(movie?.release_date || '', 'year')}` || 'N/A',
              `${handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`
            ]
              .filter((subtitle) => subtitle)
              .join(' • ')}`}
            isLoading={isLoading}
          />
        )
      )}
    </SimpleGrid>
  ) : (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]} spacing={2}>
      {_.range(0, isSuccess && movies && movies.length > 0 ? movies.length : 20).map((_dummy, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster
            key={index}
            mediaType='movie'
            image={{
              alt: 'Movie poster',
              src: '',
              size: {
                thumbnail: 'w92',
                full: 'original'
              }
            }}
            title='Lorem ipsum'
            subtitle='2021 • Lorem ipsum dolor sit amet'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            isLoading
          />
        ) : (
          <VerticalPoster
            key={index}
            width='100%'
            mediaType='movie'
            title='Lorem ipsum'
            subtitle='2021 • Lorem ipsum dolor sit amet'
            isLoading
          />
        )
      )}
    </SimpleGrid>
  );
};

export default VerticalMovies;
