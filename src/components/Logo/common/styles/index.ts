import { memoize, merge } from 'lodash';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';
import {
	isClickable as defaultIsClickable,
	isSquare as defaultIsSquare,
	size as defaultSize
} from '../data/defaultPropValues';

import logo from './logo';
import dark from './dark';
import light from './light';
import { LogoStyleProps, LogoStyleReturn } from './types';

export default memoize((props: LogoStyleProps): LogoStyleReturn => {
	const {
		theme,
		color = defaultColor,
		colorMode = defaultColorMode,
		isClickable = defaultIsClickable,
		isSquare = defaultIsSquare,
		size = defaultSize
	} = props;

	const scheme = colorMode === 'light' ? light : dark;

	return { logo: merge(logo({ theme, isClickable, isSquare, size }), scheme({ theme, color })) };
});
