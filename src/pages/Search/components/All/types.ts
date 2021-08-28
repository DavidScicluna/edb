import { UseInfiniteQueryResult } from 'react-query';

import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import { Response } from '../../../../common/types/types';

export type AllProps = {
  query: string;
  movies: UseInfiniteQueryResult<Response<PartialMovie[]>, unknown>;
  tv: UseInfiniteQueryResult<Response<PartialTV[]>, unknown>;
  people: UseInfiniteQueryResult<Response<PartialPerson[]>, unknown>;
};
