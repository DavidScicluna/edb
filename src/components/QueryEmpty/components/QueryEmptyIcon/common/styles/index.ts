import { memoize, merge } from 'lodash';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';
import { variant as defaultVariant } from '../data/defaultPropValues';

import dark from './dark';
import icon from './icon';
import light from './light';
import { QueryEmptyIconStyleProps, QueryEmptyIconStyleReturn } from './types';

export default memoize((props: QueryEmptyIconStyleProps): QueryEmptyIconStyleReturn => {
	const { theme, color = defaultColor, colorMode = defaultColorMode, variant = defaultVariant } = props;

	const scheme = colorMode === 'light' ? light : dark;

	return { icon: merge(icon({ theme }), scheme[variant]({ theme, color })) };
});
