import { UseInfiniteQueryResult } from 'react-query';

import { Company, Response } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import { SearchType } from '../../../../store/slices/User/types';
import { Collection } from '../../types';

export type AllProps = {
  query: string;
  searchTypes: SearchType[];
  movies?: Response<PartialMovie[]>;
  moviesQuery: UseInfiniteQueryResult<Response<PartialMovie[]>>;
  shows?: Response<PartialTV[]>;
  showsQuery: UseInfiniteQueryResult<Response<PartialTV[]>>;
  people?: Response<PartialPerson[]>;
  peopleQuery: UseInfiniteQueryResult<Response<PartialPerson[]>>;
  companies?: Response<Company[]>;
  companiesQuery: UseInfiniteQueryResult<Response<Company[]>>;
  collections?: Response<Collection[]>;
  collectionsQuery: UseInfiniteQueryResult<Response<Collection[]>>;
};
