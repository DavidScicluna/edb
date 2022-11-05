import { ButtonProps } from '@davidscicluna/component-library';

import { MoviesFiltersFormProps } from '../../types';

export type MoviesFiltersFormBadgeProps = Pick<ButtonProps, 'color' | 'colorMode'> &
	Pick<MoviesFiltersFormProps, 'total'>;
