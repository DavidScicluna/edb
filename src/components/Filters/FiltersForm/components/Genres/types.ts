import { CommonFiltersFormProps } from '../../common/types';
import { FiltersFormProps } from '../../types';

export type GenresProps = CommonFiltersFormProps & Pick<FiltersFormProps, 'mediaType'>;
