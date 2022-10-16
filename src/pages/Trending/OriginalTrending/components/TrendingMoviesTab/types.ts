import {
	UseTrendingInfiniteQueryResponse,
	UseTrendingInfiniteQueryResult
} from '../../../../../common/queries/useTrendingInfiniteQuery';

export type TrendingMoviesTabProps = {
	query: UseTrendingInfiniteQueryResult<'movie'>;
	movies?: UseTrendingInfiniteQueryResponse<'movie'>;
};
