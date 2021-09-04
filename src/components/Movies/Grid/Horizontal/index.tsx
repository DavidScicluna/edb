import React, { ReactElement } from 'react';

import _ from 'lodash';

import { PartialMovie } from '../../../../common/types/movie';
import Empty from '../../../Empty';
import Error from '../../../Error';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const HorizontalMovies = ({ isError, isSuccess, movies }: GridProps): ReactElement => {
  return isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='transparent' />
  ) : isSuccess && movies && movies.length === 0 ? (
    <Empty label='Movies list is currently empty!' variant='transparent' />
  ) : isSuccess && movies && movies.length > 0 ? (
    <>
      {movies.map((movie: PartialMovie) => (
        <VerticalPoster key={movie.id} isLoading={false} movie={movie} />
      ))}
    </>
  ) : (
    <>
      {[..._.range(20)].map((_dummy, index: number) => (
        <VerticalPoster key={index} isLoading />
      ))}
    </>
  );
};

export default HorizontalMovies;
