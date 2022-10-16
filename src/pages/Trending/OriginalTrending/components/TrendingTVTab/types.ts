import {
	UseTrendingInfiniteQueryResponse,
	UseTrendingInfiniteQueryResult
} from '../../../../../common/queries/useTrendingInfiniteQuery';

export type TrendingTVTabProps = {
	query: UseTrendingInfiniteQueryResult<'tv'>;
	shows?: UseTrendingInfiniteQueryResponse<'tv'>;
};
