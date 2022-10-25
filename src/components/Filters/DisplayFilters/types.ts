import { FiltersForm, FiltersMediaType } from '../types';

type OnTagActionProps = { filter: keyof FiltersForm; form: FiltersForm };

export type DisplayFiltersProps = {
	mediaType: FiltersMediaType;
	onTagClick?: (props: OnTagActionProps) => void;
	onTagDelete?: (props: OnTagActionProps) => void;
	onClear: (filters: FiltersForm) => void;
};
