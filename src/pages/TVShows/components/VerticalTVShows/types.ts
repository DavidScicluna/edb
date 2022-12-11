import {
	UseMediaTypeInfiniteQueryResponse,
	UseMediaTypeInfiniteQueryResult
} from '../../../../common/queries/useMediaTypeInfiniteQuery';

export type VerticalTVShowsProps = {
	query: UseMediaTypeInfiniteQueryResult<'tv'>;
	shows?: UseMediaTypeInfiniteQueryResponse<'tv'>;
	onLoadMore?: () => void;
};
