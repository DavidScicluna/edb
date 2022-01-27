import { UseInfiniteQueryResult } from 'react-query';

import { Response } from '../../../../../../../common/types';
import { Collection } from '../../../../../types';

export type VerticalSearchCollectionsProps = {
  query: string;
  collections?: Response<Collection[]>;
  collectionsQuery: UseInfiniteQueryResult<Response<Collection[]>>;
};
