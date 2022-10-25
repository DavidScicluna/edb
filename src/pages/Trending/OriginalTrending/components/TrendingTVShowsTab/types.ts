import {
	UseTrendingInfiniteQueryResponse,
	UseTrendingInfiniteQueryResult
} from '../../../../../common/queries/useTrendingInfiniteQuery';

export type TrendingTVShowsTabProps = {
	query: UseTrendingInfiniteQueryResult<'tv'>;
	shows?: UseTrendingInfiniteQueryResponse<'tv'>;
};
