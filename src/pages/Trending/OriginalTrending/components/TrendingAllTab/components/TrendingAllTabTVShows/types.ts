import { UseTrendingInfiniteQueryResult } from '../../../../../../../common/queries/useTrendingInfiniteQuery';
import { TrendingAllTabProps } from '../../types';

export type TrendingAllTabShowsProps = Pick<TrendingAllTabProps, 'shows' | 'onTabChange'> & {
	query: UseTrendingInfiniteQueryResult<'tv'>;
};
