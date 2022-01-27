import { UseInfiniteQueryResult } from 'react-query';

import { Response } from '../../../../../../../common/types';
import { PartialTV } from '../../../../../../../common/types/tv';

export type VerticalSearchTVProps = {
  query: string;
  shows?: Response<PartialTV[]>;
  showsQuery: UseInfiniteQueryResult<Response<PartialTV[]>>;
};
