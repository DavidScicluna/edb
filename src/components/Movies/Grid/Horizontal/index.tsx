import React, { ReactElement } from 'react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { PartialMovie } from '../../../../common/types/movie';
import Empty from '../../../Empty';
import Error from '../../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const HorizontalMovies = ({ isLoading, isError, isSuccess, movies }: GridProps): ReactElement => {
  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);

  return isLoading && !hasOptionsDownloaded ? (
    <>
      {[...Array(movies ? movies.length : 20)].map((_dummy, index: number) => (
        <VerticalPoster key={index} isLoading />
      ))}
    </>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='transparent' />
  ) : isSuccess && movies && movies.length > 0 ? (
    <>
      {movies.map((movie: PartialMovie) => (
        <VerticalPoster key={movie.id} isLoading={false} movie={movie} />
      ))}
    </>
  ) : (
    <Empty label='Movies list is currently empty!' variant='transparent' />
  );
};

export default HorizontalMovies;
