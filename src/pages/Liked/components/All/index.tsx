import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Center, Text, Collapse } from '@chakra-ui/react';

import departments from '../../../../common/data/departments';
import { useSelector } from '../../../../common/hooks';
import { handleReturnDate, handleReturnGenresByID } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { AllProps } from './types';

const All = ({ movies = [], tv = [], people = [] }: AllProps): ReactElement => {
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
          <Badge label={String(total)} color='gray' size='lg' ml={2} />
        </Text>
      </Center>
    );
  };

  return (
    <VStack width='100%' spacing={6}>
      {/* Movies */}
      <Collapse in={(movies && movies.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
        <HorizontalGrid
          title={handleRenderTitle('Movies', movies.length)}
          footer={
            movies.length > 20 ? (
              <Link to={{ pathname: '/liked/movie' }} isFullWidth>
                <Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                  {`View all ${movies.length || 0} liked movie${
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
                    `${handleReturnDate(movie?.release_date || '', 'year')}` || 'N/A',
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
              <Link to={{ pathname: '/liked/tv' }} isFullWidth>
                <Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                  {`View all ${tv?.length || 0} liked TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`}
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
                    `${handleReturnDate(show?.first_air_date || '', 'year')}` || 'N/A',
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

      {/* People */}
      <Collapse in={(people && people.length > 0) || false} unmountOnExit style={{ width: '100%' }}>
        <HorizontalGrid
          title={handleRenderTitle('People', people.length)}
          footer={
            people.length > 20 ? (
              <Link to={{ pathname: '/liked/person' }} isFullWidth>
                <Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
                  {`View all ${people.length || 0} liked ${
                    (people && people.length === 0) || people.length > 1 ? 'people' : 'person'
                  }`}
                </Button>
              </Link>
            ) : undefined
          }
          isLoading={false}>
          <>
            {people.map((person, index) =>
              index < 20 ? (
                <VerticalPoster
                  key={person.id}
                  width={['185px', '205px', '230px']}
                  mediaItem={person ? { ...person } : undefined}
                  mediaType='person'
                  image={{
                    alt: `${person?.name || ''} person poster`,
                    src: person?.profile_path || '',
                    size: {
                      thumbnail: 'w45',
                      full: 'original'
                    }
                  }}
                  title={person?.name || ''}
                  subtitle={
                    departments.find((department) => department.value === person?.known_for_department)?.name ||
                    person?.known_for_department ||
                    'N/A'
                  }
                  isLoading={false}
                />
              ) : null
            )}
          </>
        </HorizontalGrid>
      </Collapse>
    </VStack>
  );
};

export default All;
