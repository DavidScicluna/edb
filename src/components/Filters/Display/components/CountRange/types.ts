import { FiltersFormNumbers } from '../../../types';
import { CommonDisplayFiltersProps } from '../../common/types';

export type CountRangeProps = CommonDisplayFiltersProps & {
	counts: FiltersFormNumbers;
};
