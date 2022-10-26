import { DisplayFiltersProps } from '../../../../../components/Filters/DisplayFilters/types';

export type TVShowsDisplayFiltersProps = Pick<DisplayFiltersProps, 'onTagDelete' | 'onClear'> & {
	total: number;
};
