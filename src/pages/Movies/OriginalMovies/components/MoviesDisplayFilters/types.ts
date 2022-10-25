import { DisplayFiltersProps } from '../../../../../components/Filters/DisplayFilters/types';

export type MoviesDisplayFiltersProps = Pick<DisplayFiltersProps, 'onTagDelete' | 'onClear'> & {
	total: number;
};
