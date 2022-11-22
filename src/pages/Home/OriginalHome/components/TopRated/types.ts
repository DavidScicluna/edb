import { UseTopRatedQueryResult } from '../../../../../common/queries/useTopRatedQuery';

export type TopRatedProps = {
	moviesQuery: UseTopRatedQueryResult<'movie'>;
	tvShowsQuery: UseTopRatedQueryResult<'tv'>;
};
