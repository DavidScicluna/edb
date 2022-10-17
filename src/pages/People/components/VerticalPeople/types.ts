import {
	UsePeopleInfiniteQueryResponse,
	UsePeopleInfiniteQueryResult
} from '../../../../common/queries/usePeopleInfiniteQuery';

export type VerticalPeopleProps = {
	query: UsePeopleInfiniteQueryResult;
	people?: UsePeopleInfiniteQueryResponse;
};
