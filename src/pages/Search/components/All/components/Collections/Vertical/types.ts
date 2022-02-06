import { UseInfiniteQueryResult } from 'react-query';

import { Response } from '../../../../../../../common/types';
import { Collection } from '../../../../../../../common/types/movie';

export type VerticalSearchCollectionsProps = {
  query: string;
  collections?: Response<Collection[]>;
  collectionsQuery: UseInfiniteQueryResult<Response<Collection[]>>;
};
