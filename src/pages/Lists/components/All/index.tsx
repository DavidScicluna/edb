import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Center, Text, Fade, Collapse } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import { handleReturnColor, handleReturnDate, handleReturnGenresByID } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { AllProps } from './types';

const All = ({ list, movies = [], tv = [] }: AllProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const handleRenderTitle = (title: string, total: number): ReactElement => {
    return (
      <Center>
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize={['xl', 'xl', '2xl', '2xl', '2xl', '2xl']}
          fontWeight='semibold'
          textTransform='capitalize'>
          {title}
        </Text>
        <Badge label={String(total)} color='gray' size='lg' ml={2} />
      </Center>
    );
  };

  return (
    <Fade in={(movies && movies.length > 0) || (tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
      <VStack width='100%' spacing={6}>
        {/* Movies */}
        <Collapse in={(movies && movies.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={handleRenderTitle('Movies', movies.length)}
            footer={
              movies.length > 20 ? (
                <Link to={{ pathname: `/lists/${list.id}/movie` }} isFullWidth>
                  <Button color={handleReturnColor(color)} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                    {`View all ${movies.length || 0} movie${
                      movies && (movies.length === 0 || movies.length > 1 ? 's' : '')
                    }`}
                  </Button>
                </Link>
              ) : undefined
            }
            isLoading={false}>
            <>
              {movies.map((movie, index) =>
                index < 20 ? (
                  <VerticalPoster
                    key={movie.id}
                    width={['185px', '205px', '230px']}
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
                      `${handleReturnDate(movie?.release_date || '', 'year')}`,
                      `${handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`
                    ]
                      .filter((subtitle) => subtitle)
                      .join(' • ')}`}
                    isLoading={false}
                  />
                ) : null
              )}
            </>
          </HorizontalGrid>
        </Collapse>

        {/* TV */}
        <Collapse in={(tv && tv.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
          <HorizontalGrid
            title={handleRenderTitle('TV shows', tv.length)}
            footer={
              tv.length > 20 ? (
                <Link to={{ pathname: `/lists/${list.id}/tv` }} isFullWidth>
                  <Button color={handleReturnColor(color)} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                    {`View all ${tv?.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
                  </Button>
                </Link>
              ) : undefined
            }
            isLoading={false}>
            <>
              {tv.map((show, index) =>
                index < 20 ? (
                  <VerticalPoster
                    key={show.id}
                    width={['185px', '205px', '230px']}
                    mediaItem={show ? { ...show } : undefined}
                    mediaType='tv'
                    image={{
                      alt: `${show?.name || ''} tv show poster`,
                      src: show?.poster_path || '',
                      size: {
                        thumbnail: 'w92',
                        full: 'original'
                      }
                    }}
                    rating={{
                      rating: show?.vote_average || null,
                      count: show?.vote_count || null
                    }}
                    title={show?.name || ''}
                    subtitle={`${[
                      `${handleReturnDate(show?.first_air_date || '', 'year')}`,
                      `${handleReturnGenresByID(show?.genre_ids || [], 'tv')}`
                    ]
                      .filter((subtitle) => subtitle)
                      .join(' • ')}`}
                    isLoading={false}
                  />
                ) : null
              )}
            </>
          </HorizontalGrid>
        </Collapse>
      </VStack>
    </Fade>
  );
};

export default All;
