import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import { PartialMovie } from '../../../../common/types/movie';
import Empty from '../../../Empty';
import Error from '../../../Error';
import HorizontalPoster from '../../Poster/Horizontal';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const VerticalMovies = ({ isError, isSuccess, movies }: GridProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 320px)');

  const displayMode = useSelector((state) => state.app.ui.displayMode);

  return isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='outlined' />
  ) : isSuccess && movies && movies.length === 0 ? (
    <Empty label='Movies list is currently empty!' variant='outlined' />
  ) : isSuccess && movies && movies.length > 0 ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]} spacing={2}>
      {movies.map((movie: PartialMovie) =>
        displayMode === 'list' ? (
          <HorizontalPoster key={movie.id} isLoading={false} movie={movie} />
        ) : (
          <VerticalPoster key={movie.id} width='100%' isLoading={false} movie={movie} />
        )
      )}
    </SimpleGrid>
  ) : (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]} spacing={2}>
      {[...Array(movies ? movies.length : 20)].map((_dummy, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster key={index} isLoading />
        ) : (
          <VerticalPoster key={index} width='100%' isLoading />
        )
      )}
    </SimpleGrid>
  );
};

export default VerticalMovies;
