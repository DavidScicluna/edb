import { UseTrendingInfiniteQueryResult } from '../../../../../../../common/queries/useTrendingInfiniteQuery';
import { TrendingAllTabProps } from '../../types';

export type TrendingAllTabMoviesProps = Pick<TrendingAllTabProps, 'movies' | 'onTabChange'> & {
	query: UseTrendingInfiniteQueryResult<'movie'>;
};
