import { Filters, FiltersMediaTypes } from '../types';

export type DisplayFiltersProps = {
	mediaType: FiltersMediaTypes;
	onTagClick?: (filter: keyof Filters, filters: Filters) => void;
	onTagDelete?: (filter: keyof Filters, filters: Filters) => void;
	onClear: (filters: Filters) => void;
};
