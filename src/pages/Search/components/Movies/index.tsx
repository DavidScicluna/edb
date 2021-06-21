import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, SimpleGrid } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { PartialMovie } from '../../../../common/types/movie';
import utils from '../../../../common/utils/utils';
import HorizontalPoster from '../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { MovieProps } from './types';

const size = utils.handleReturnImageSize('poster', 'sm');

const Movies = ({ movies, isLoading = false }: MovieProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);

  return (
    <VStack width='100%' spacing={4} px={2}>
      {isLoading && !hasOptionsDownloaded ? (
        <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
          {[...Array((movies && movies.results.length) || 20)].map((_dummy, index) =>
            displayMode === 'list' ? (
              <HorizontalPoster
                key={index}
                mediaType='movie'
                image={{
                  alt: 'movie poster',
                  src: '',
                  size
                }}
                rating={{
                  rating: null,
                  count: null
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
                mediaType='movie'
                image={{
                  alt: 'movie poster',
                  src: '',
                  size
                }}
                rating={{
                  rating: null,
                  count: null
                }}
                title='Lorem ipsum'
                subtitle='Lorem ipsum'
                isLoaded={false}
              />
            )
          )}
        </SimpleGrid>
      ) : (
        <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
          {movies &&
            movies.results.map((movie: PartialMovie, index: number) =>
              displayMode === 'list' ? (
                <HorizontalPoster
                  key={index}
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
                  subtitle={`${utils.handleReturnDate(
                    movie?.release_date || '',
                    'full'
                  )} • ${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
                  description={movie?.overview || ''}
                  isLoaded={true}
                />
              ) : (
                <VerticalPoster
                  key={index}
                  width='100%'
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
                  subtitle={`${utils.handleReturnDate(
                    movie?.release_date || '',
                    'year'
                  )} • ${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
                  isLoaded={true}
                />
              )
            )}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default Movies;
