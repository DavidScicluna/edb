import {
	UseMediaTypeInfiniteQueryResponse,
	UseMediaTypeInfiniteQueryResult
} from '../../../../common/queries/useMediaTypeInfiniteQuery';

export type VerticalMoviesProps = {
	query: UseMediaTypeInfiniteQueryResult<'movie'>;
	movies?: UseMediaTypeInfiniteQueryResponse<'movie'>;
	onLoadMore?: () => void;
};
