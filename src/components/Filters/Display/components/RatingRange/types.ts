import { FiltersFormNumbers } from '../../../types';
import { CommonDisplayFiltersProps } from '../../common/types';

export type RatingRangeProps = CommonDisplayFiltersProps & {
	ratings: FiltersFormNumbers;
};
