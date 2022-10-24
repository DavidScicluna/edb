import { ButtonProps } from '@davidscicluna/component-library';

import { FiltersFormProps } from '../../../../../components/Filters/Form/types';

export type MoviesFiltersFormProps = Pick<FiltersFormProps, 'onFilter'> & Pick<ButtonProps, 'isDisabled'>;
