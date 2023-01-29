import { UseSearchInfiniteQueryResponse } from '../../../../../../../common/queries/useSearchInfiniteQuery';
import { MediaType } from '../../../../../../../common/types';

export type AllTabProps = {
	mediaTypes: MediaType[];
	movies?: UseSearchInfiniteQueryResponse<'movie'>;
	shows?: UseSearchInfiniteQueryResponse<'tv'>;
	people?: UseSearchInfiniteQueryResponse<'person'>;
	companies?: UseSearchInfiniteQueryResponse<'company'>;
	collections?: UseSearchInfiniteQueryResponse<'collection'>;
};
