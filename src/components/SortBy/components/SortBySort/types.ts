import { UseFormReturn } from 'react-hook-form';

import { SortByForm, SortBy } from '../../types';

export type SortBySortProps = {
	form: UseFormReturn<SortByForm>;
	sortBy: SortBy;
};
