import { ReactElement } from 'react';

import { VStack, Fade } from '@chakra-ui/react';

import Movies from './components/Movies';
import People from './components/People';
import TV from './components/TV';
import { AllProps } from './types';

const All = ({ query, movies, tv, people }: AllProps): ReactElement => {
  return (
    <VStack width='100%' spacing={6}>
      {/* Movies */}
      <Fade
        in={(movies.data?.pages[movies.data?.pages.length - 1]?.results.length || 0) > 0}
        unmountOnExit
        style={{ width: '100%' }}>
        <Movies
          query={query}
          results={movies.data?.pages[movies.data?.pages.length - 1].results || []}
          total_results={movies.data?.pages[movies.data?.pages.length - 1].total_results || 0}
          isFetching={movies.isFetching}
          isLoading={movies.isLoading}
          isError={movies.isError}
          isSuccess={movies.isSuccess}
          refetch={movies.refetch}
        />
      </Fade>

      {/* TV */}
      <Fade
        in={(tv.data?.pages[tv.data?.pages.length - 1]?.results.length || 0) > 0}
        unmountOnExit
        style={{ width: '100%' }}>
        <TV
          query={query}
          results={tv.data?.pages[tv.data?.pages.length - 1].results || []}
          total_results={tv.data?.pages[tv.data?.pages.length - 1].total_results || 0}
          isFetching={tv.isFetching}
          isLoading={tv.isLoading}
          isError={tv.isError}
          isSuccess={tv.isSuccess}
          refetch={tv.refetch}
        />
      </Fade>

      {/* People */}
      <Fade
        in={(people.data?.pages[people.data?.pages.length - 1]?.results.length || 0) > 0}
        unmountOnExit
        style={{ width: '100%' }}>
        <People
          query={query}
          results={people.data?.pages[people.data?.pages.length - 1].results || []}
          total_results={people.data?.pages[people.data?.pages.length - 1].total_results || 0}
          isFetching={people.isFetching}
          isLoading={people.isLoading}
          isError={people.isError}
          isSuccess={people.isSuccess}
          refetch={people.refetch}
        />
      </Fade>
    </VStack>
  );
};

export default All;
