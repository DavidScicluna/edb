import { ReactElement } from 'react';

import { VStack, Fade } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import HorizontalSearchCollections from './components/Collections/Horizontal';
import VerticalSearchCollections from './components/Collections/Vertical';
import Companies from './components/Companies';
import HorizontalSearchMovies from './components/Movies/Horizontal';
import VerticalSearchMovies from './components/Movies/Vertical';
import HorizontalSearchPeople from './components/People/Horizontal';
import VerticalSearchPeople from './components/People/Vertical';
import HorizontalSearchTV from './components/TV/Horizontal';
import VerticalSearchTV from './components/TV/Vertical';
import { AllProps } from './types';

const All = (props: AllProps): ReactElement => {
  const location = useLocation();

  const {
    query,
    searchTypes,
    movies,
    moviesQuery,
    shows,
    showsQuery,
    people,
    peopleQuery,
    collections,
    collectionsQuery
    // companies,
    // companiesQuery
  } = props;

  return (
    <VStack width='100%' spacing={4}>
      {/* Movies */}
      <Fade
        in={
          (movies?.total_results || 0) > 0 && (searchTypes.length === 0 || searchTypes.some((type) => type === 'movie'))
        }
        unmountOnExit
        style={{ width: '100%' }}
      >
        {searchTypes.length === 1 || (location.hash && location.hash === '#movie') ? (
          <VerticalSearchMovies query={query} movies={movies} moviesQuery={moviesQuery} />
        ) : (
          <HorizontalSearchMovies query={query} movies={movies?.results || []} total={movies?.total_results || 0} />
        )}
      </Fade>

      {/* TV Shows */}
      <Fade
        in={(shows?.total_results || 0) > 0 && (searchTypes.length === 0 || searchTypes.some((type) => type === 'tv'))}
        unmountOnExit
        style={{ width: '100%' }}
      >
        {searchTypes.length === 1 || (location.hash && location.hash === '#tv') ? (
          <VerticalSearchTV query={query} shows={shows} showsQuery={showsQuery} />
        ) : (
          <HorizontalSearchTV query={query} shows={shows?.results || []} total={shows?.total_results || 0} />
        )}
      </Fade>

      {/* People */}
      <Fade
        in={
          (people?.total_results || 0) > 0 &&
          (searchTypes.length === 0 || searchTypes.some((type) => type === 'person'))
        }
        unmountOnExit
        style={{ width: '100%' }}
      >
        {searchTypes.length === 1 || (location.hash && location.hash === '#person') ? (
          <VerticalSearchPeople query={query} people={people} peopleQuery={peopleQuery} />
        ) : (
          <HorizontalSearchPeople query={query} people={people?.results || []} total={people?.total_results || 0} />
        )}
      </Fade>

      {/* Collections */}
      <Fade
        in={
          (collections?.total_results || 0) > 0 &&
          (searchTypes.length === 0 || searchTypes.some((type) => type === 'collection'))
        }
        unmountOnExit
        style={{ width: '100%' }}
      >
        {searchTypes.length === 1 || (location.hash && location.hash === '#collection') ? (
          <VerticalSearchCollections query={query} collections={collections} collectionsQuery={collectionsQuery} />
        ) : (
          <HorizontalSearchCollections
            query={query}
            collections={collections?.results || []}
            total={collections?.total_results || 0}
          />
        )}
      </Fade>

      {/* Companies */}
      {/* <Fade in={(companies?.total_results || 0) > 0 &&   (searchTypes.length === 0 || searchTypes.every((type) => type === 'collection'))} unmountOnExit style={{ width: '100%' }}>
        <Companies query={query} companies={companies?.results || []} total={companies?.total_results || 0} />
      </Fade> */}
    </VStack>
  );
};

export default All;
