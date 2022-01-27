import { UseInfiniteQueryResult } from 'react-query';

import { Response } from '../../../../../../../common/types';
import { PartialPerson } from '../../../../../../../common/types/person';

export type VerticalSearchPeopleProps = {
  query: string;
  people?: Response<PartialPerson[]>;
  peopleQuery: UseInfiniteQueryResult<Response<PartialPerson[]>>;
};
