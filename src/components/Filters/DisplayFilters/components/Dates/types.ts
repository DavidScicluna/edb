import { CommonDisplayFiltersProps } from '../../common/types';
import { FiltersFormDates } from '../../../types';
import { DisplayFiltersProps } from '../../types';

export type DatesProps = CommonDisplayFiltersProps & {
	dates: FiltersFormDates;
} & Pick<DisplayFiltersProps, 'mediaType'>;
