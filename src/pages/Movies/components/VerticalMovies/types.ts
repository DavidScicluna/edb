import {
	UseMoviesInfiniteQueryResponse,
	UseMoviesInfiniteQueryResult
} from '../../../../common/queries/useMoviesInfiniteQuery';

export type VerticalMoviesProps = {
	query: UseMoviesInfiniteQueryResult;
	movies?: UseMoviesInfiniteQueryResponse;
	onLoadMore?: () => void;
};
