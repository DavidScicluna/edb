import { Theme, Style } from '@davidscicluna/component-library';

import { QueryEmptyProps } from '../../../../types';
import { QueryEmptyIconProps } from '../../types';

export type QueryEmptyIconStyleProps = Pick<QueryEmptyProps, 'color' | 'colorMode'> & {
	theme: Theme;
} & Pick<QueryEmptyIconProps, 'variant'>;

export type QueryEmptyIconStyleReturn = {
	icon: Style;
};
