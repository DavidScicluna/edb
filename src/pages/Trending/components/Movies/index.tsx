import { ReactElement } from 'react';

import { useMediaQuery, Box, VStack } from '@chakra-ui/react';


import { MoviesProps } from './types';

import LoadMore from '../../../../components/Clickable/LoadMore';
import VerticalMovies from '../../../Movies/components/Orientation/Vertical';

const Movies = ({ movies, query }: MoviesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <VStack width='100%' spacing={4}>
      <VerticalMovies
        isError={query.isError}
        isSuccess={query.isSuccess}
        isLoading={query.isFetching || query.isLoading}
        movies={movies?.results || []}
      />

      <Box style={{ width: isSm ? '100%' : 'auto' }}>
        <LoadMore
          amount={movies?.results?.length || 0}
          total={movies?.total_results || 0}
          label='Trending Movies'
          isLoading={query.isFetching || query.isLoading}
          isButtonVisible={query.hasNextPage && !query.isError}
          onClick={() => query.fetchNextPage()}
        />
      </Box>
    </VStack>
  );
};

export default Movies;
