import { ButtonProps } from '@davidscicluna/component-library';

import { FiltersFormProps } from '../../../../../components/Filters/FiltersForm/types';

export type MoviesFiltersFormProps = Pick<FiltersFormProps, 'onFilter'> & {
	total: number;
} & Pick<ButtonProps, 'isDisabled'>;
