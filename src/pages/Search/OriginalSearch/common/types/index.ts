import {
	UseSearchInfiniteQueryResponse,
	UseSearchInfiniteQueryResult
} from '../../../../../common/queries/useSearchInfiniteQuery';
import { MediaType } from '../../../../../common/types';

export type CommonSearchProps<MT extends MediaType> = {
	query: UseSearchInfiniteQueryResult<MT>;
	data?: UseSearchInfiniteQueryResponse<MT>;
};
