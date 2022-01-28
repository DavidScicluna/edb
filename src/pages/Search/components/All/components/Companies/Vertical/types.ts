import { UseInfiniteQueryResult } from 'react-query';

import { Response, Company } from '../../../../../../../common/types';

export type VerticalSearchCompaniesProps = {
  query: string;
  companies?: Response<Company[]>;
  companiesQuery: UseInfiniteQueryResult<Response<Company[]>>;
};
