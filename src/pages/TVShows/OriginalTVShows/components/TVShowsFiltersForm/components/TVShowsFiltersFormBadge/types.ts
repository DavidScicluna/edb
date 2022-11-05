import { ButtonProps } from '@davidscicluna/component-library';

import { TVShowsFiltersFormProps } from '../../types';

export type TVShowsFiltersFormBadgeProps = Pick<ButtonProps, 'color' | 'colorMode'> &
	Pick<TVShowsFiltersFormProps, 'total'>;
