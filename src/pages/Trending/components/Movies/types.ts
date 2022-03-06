import { UseInfiniteQueryResult } from 'react-query';

import { Response } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';

export type MoviesProps = {
	movies?: Response<PartialMovie[]>;
	query: UseInfiniteQueryResult<Response<PartialMovie[]>>;
	onLoadMore: () => void;
};
