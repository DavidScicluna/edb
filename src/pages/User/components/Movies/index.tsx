import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import LoadMore from '../../../../components/Clickable/LoadMore';
import VerticalMovies from '../../../Movies/components/Orientation/Vertical';
import { MoviesProps } from './types';

const incrementBy = 20;

const Movies = ({ movies }: MoviesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <VStack width='100%' spacing={4}>
      <VerticalMovies
        isError={movies.length === 0}
        isSuccess={movies.length > 0}
        isLoading={false}
        movies={movies.filter((_movie, index) => index < totalVisible)}
      />

      <ScaleFade
        in={movies.length > 0 && movies.length > incrementBy}
        unmountOnExit
        style={{ width: isSm ? '100%' : 'auto' }}
      >
        <LoadMore
          amount={totalVisible}
          total={movies.length}
          label='Movies'
          onClick={() => setTotalVisible(totalVisible + incrementBy)}
        />
      </ScaleFade>
    </VStack>
  );
};

export default Movies;
