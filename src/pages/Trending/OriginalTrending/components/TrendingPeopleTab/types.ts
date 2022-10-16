import {
	UseTrendingInfiniteQueryResponse,
	UseTrendingInfiniteQueryResult
} from '../../../../../common/queries/useTrendingInfiniteQuery';

export type TrendingPeopleTabProps = {
	query: UseTrendingInfiniteQueryResult<'person'>;
	people?: UseTrendingInfiniteQueryResponse<'person'>;
};
