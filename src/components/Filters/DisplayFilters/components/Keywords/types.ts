import { FiltersFormKeywords } from '../../../types';
import { CommonDisplayFiltersProps } from '../../common/types';

export type KeywordsProps = CommonDisplayFiltersProps & {
	keywords: FiltersFormKeywords;
};
