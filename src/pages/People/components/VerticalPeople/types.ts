import {
	UseMediaTypeInfiniteQueryResponse,
	UseMediaTypeInfiniteQueryResult
} from '../../../../common/queries/useMediaTypeInfiniteQuery';

export type VerticalPeopleProps = {
	query: UseMediaTypeInfiniteQueryResult<'person'>;
	people?: UseMediaTypeInfiniteQueryResponse<'person'>;
};
