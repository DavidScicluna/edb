import { UseInfiniteQueryResult } from 'react-query';

import { Company, Response } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import { Collection } from '../../types';

export type AllProps = {
  query: string;
  moviesQuery: UseInfiniteQueryResult<Response<PartialMovie[]>, unknown>;
  tvQuery: UseInfiniteQueryResult<Response<PartialTV[]>, unknown>;
  peopleQuery: UseInfiniteQueryResult<Response<PartialPerson[]>, unknown>;
  companiesQuery: UseInfiniteQueryResult<Response<Company[]>, unknown>;
  collectionsQuery: UseInfiniteQueryResult<Response<Collection[]>, unknown>;
};
