import { UseTrendingInfiniteQueryResult } from '../../../../../../../common/queries/useTrendingInfiniteQuery';
import { TrendingAllTabProps } from '../../types';

export type TrendingAllTabPeopleProps = Pick<TrendingAllTabProps, 'people' | 'onTabChange'> & {
	query: UseTrendingInfiniteQueryResult<'person'>;
};
