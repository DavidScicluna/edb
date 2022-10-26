import {
	UseTVShowsInfiniteQueryResponse,
	UseTVShowsInfiniteQueryResult
} from '../../../../common/queries/useTVShowsInfiniteQuery';

export type VerticalTVShowsProps = {
	query: UseTVShowsInfiniteQueryResult;
	shows?: UseTVShowsInfiniteQueryResponse;
};
