import { UseInfiniteQueryResult } from 'react-query';

import { Response, PartialCompany } from '../../../../../../../common/types';

export type VerticalSearchCompaniesProps = {
	query: string;
	companies?: Response<PartialCompany[]>;
	companiesQuery: UseInfiniteQueryResult<Response<PartialCompany[]>>;
};
