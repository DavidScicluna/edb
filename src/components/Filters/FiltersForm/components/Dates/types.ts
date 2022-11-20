import { FiltersMediaType } from '../../../types';
import { CommonFiltersFormProps } from '../../common/types';

export type DatesProps = CommonFiltersFormProps & {
	mediaType: FiltersMediaType;
};
