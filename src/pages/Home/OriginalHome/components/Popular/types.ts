import { UsePopularQueryResult } from '../../../../../common/queries/usePopularQuery';

export type PopularProps = {
	moviesQuery: UsePopularQueryResult<'movie'>;
	tvShowsQuery: UsePopularQueryResult<'tv'>;
};
