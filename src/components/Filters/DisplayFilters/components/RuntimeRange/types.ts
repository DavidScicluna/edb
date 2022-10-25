import { FiltersFormNumbers } from '../../../types';
import { CommonDisplayFiltersProps } from '../../common/types';

export type RuntimeRangeProps = CommonDisplayFiltersProps & {
	runtimes: FiltersFormNumbers;
};
