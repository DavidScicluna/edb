import { UseTrendingQueryResult } from '../../../../../common/queries/useTrendingQuery';

export type TrendingProps = {
	moviesQuery: UseTrendingQueryResult<'movie'>;
	tvShowsQuery: UseTrendingQueryResult<'tv'>;
	peopleQuery: UseTrendingQueryResult<'tv'>;
};
