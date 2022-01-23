import { ReactElement } from 'react';

import { VStack, Fade } from '@chakra-ui/react';

import Collections from './components/Collections';
import Companies from './components/Companies';
import Movies from './components/Movies';
import People from './components/People';
import TV from './components/TV';
import { AllProps } from './types';

const All = (props: AllProps): ReactElement => {
  const { query, moviesQuery, tvQuery, peopleQuery, collectionsQuery, companiesQuery } = props;

  return (
    <VStack width='100%' spacing={4}>
      {/* Movies */}
      <Fade
        in={
          moviesQuery.isSuccess &&
          (moviesQuery.data?.pages[moviesQuery.data?.pages.length - 1]?.results || []).length > 0
        }
        unmountOnExit
        style={{ width: '100%' }}
      >
        <Movies
          query={query}
          movies={moviesQuery.data?.pages[moviesQuery.data?.pages.length - 1]?.results || []}
          total={moviesQuery.data?.pages[moviesQuery.data?.pages.length - 1]?.total_results || 0}
        />
      </Fade>

      {/* TV Shows */}
      <Fade
        in={tvQuery.isSuccess && (tvQuery.data?.pages[tvQuery.data?.pages.length - 1]?.results || []).length > 0}
        unmountOnExit
        style={{ width: '100%' }}
      >
        <TV
          query={query}
          shows={tvQuery.data?.pages[tvQuery.data?.pages.length - 1]?.results || []}
          total={tvQuery.data?.pages[tvQuery.data?.pages.length - 1]?.total_results || 0}
        />
      </Fade>

      {/* People */}
      <Fade
        in={
          peopleQuery.isSuccess &&
          (peopleQuery.data?.pages[peopleQuery.data?.pages.length - 1]?.results || []).length > 0
        }
        unmountOnExit
        style={{ width: '100%' }}
      >
        <People
          query={query}
          people={peopleQuery.data?.pages[peopleQuery.data?.pages.length - 1]?.results || []}
          total={peopleQuery.data?.pages[peopleQuery.data?.pages.length - 1]?.total_results || 0}
        />
      </Fade>

      {/* Collections */}
      <Fade
        in={
          collectionsQuery.isSuccess &&
          (collectionsQuery.data?.pages[collectionsQuery.data?.pages.length - 1]?.results || []).length > 0
        }
        unmountOnExit
        style={{ width: '100%' }}
      >
        <Collections
          query={query}
          collections={collectionsQuery.data?.pages[collectionsQuery.data?.pages.length - 1]?.results || []}
          total={collectionsQuery.data?.pages[collectionsQuery.data?.pages.length - 1]?.total_results || 0}
        />
      </Fade>

      {/* Companies */}
      <Fade
        in={
          companiesQuery.isSuccess &&
          (companiesQuery.data?.pages[companiesQuery.data?.pages.length - 1]?.results || []).length > 0
        }
        unmountOnExit
        style={{ width: '100%' }}
      >
        <Companies
          query={query}
          companies={companiesQuery.data?.pages[companiesQuery.data?.pages.length - 1]?.results || []}
          total={companiesQuery.data?.pages[companiesQuery.data?.pages.length - 1]?.total_results || 0}
        />
      </Fade>
    </VStack>
  );
};

export default All;
