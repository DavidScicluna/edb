import { IconType } from '@davidscicluna/component-library';

import { UseFormReturn } from 'react-hook-form';

import { SortByForm, SortDirection } from '../../types';

export type SortByDirection = { label: string; value: SortDirection; icon: IconType };
export type SortByDirections = SortByDirection[];

export type SortByDirectionProps = {
	form: UseFormReturn<SortByForm>;
};
