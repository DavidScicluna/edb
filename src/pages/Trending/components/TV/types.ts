import { UseInfiniteQueryResult } from 'react-query';

import { Response } from '../../../../common/types';
import { PartialTV } from '../../../../common/types/tv';

export type TVProps = {
	shows?: Response<PartialTV[]>;
	query: UseInfiniteQueryResult<Response<PartialTV[]>>;
	onLoadMore: () => void;
};
