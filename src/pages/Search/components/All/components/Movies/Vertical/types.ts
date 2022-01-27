import { UseInfiniteQueryResult } from 'react-query';

import { Response } from '../../../../../../../common/types';
import { PartialMovie } from '../../../../../../../common/types/movie';

export type VerticalSearchMoviesProps = {
  query: string;
  movies?: Response<PartialMovie[]>;
  moviesQuery: UseInfiniteQueryResult<Response<PartialMovie[]>>;
};
