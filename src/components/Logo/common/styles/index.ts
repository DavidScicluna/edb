import { memoize, merge } from 'lodash';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';
import { size as defaultSize } from '../data/defaultPropValues';

import logo from './logo';
import dark from './dark';
import light from './light';
import { LogoStyleProps, LogoStyleReturn } from './types';

export default memoize((props: LogoStyleProps): LogoStyleReturn => {
	const { theme, color = defaultColor, colorMode = defaultColorMode, size = defaultSize } = props;

	const scheme = colorMode === 'light' ? light : dark;

	return { logo: merge(logo({ theme, size }), scheme({ theme, color })) };
});
