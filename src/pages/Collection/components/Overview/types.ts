import { UseQueryResult } from 'react-query';

import { Images } from '../../../../common/types';
import { Collection } from '../../../../common/types/movie';

export type OverviewTabProps = {
  collectionQuery: UseQueryResult<Collection>;
  imagesQuery: UseQueryResult<Images>;
};
