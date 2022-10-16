import {
	UseTrendingInfiniteQueryResponse,
	UseTrendingInfiniteQueryResult
} from '../../../../../common/queries/useTrendingInfiniteQuery';
import { TrendingMediaType } from '../../types';

type OnSetActiveTabProps = { mediaType: TrendingMediaType };

export type TrendingAllTabProps = {
	moviesInfiniteQuery: UseTrendingInfiniteQueryResult<'movie'>;
	movies?: UseTrendingInfiniteQueryResponse<'movie'>;
	tvShowsInfiniteQuery: UseTrendingInfiniteQueryResult<'tv'>;
	shows?: UseTrendingInfiniteQueryResponse<'tv'>;
	peopleInfiniteQuery: UseTrendingInfiniteQueryResult<'person'>;
	people?: UseTrendingInfiniteQueryResponse<'person'>;
	onTabChange: (props: OnSetActiveTabProps) => void;
};
