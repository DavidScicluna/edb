import { UseInfiniteQueryResult } from 'react-query';

import { Response } from '../../../../common/types';
import { PartialPerson } from '../../../../common/types/person';

export type PeopleProps = {
	people?: Response<PartialPerson[]>;
	query: UseInfiniteQueryResult<Response<PartialPerson[]>>;
	onLoadMore: () => void;
};
