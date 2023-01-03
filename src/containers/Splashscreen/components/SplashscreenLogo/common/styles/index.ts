import { memoize, merge } from 'lodash';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';
import { colors as defaultColors, size as defaultSize } from '../data/defaultPropValues';

import logo from './logo';
import keyframe from './keyframe';
import { SplashscreenLogoStyleProps, SplashscreenLogoStyleReturn } from './types';

export default memoize((props: SplashscreenLogoStyleProps): SplashscreenLogoStyleReturn => {
	const {
		theme,
		color = defaultColor,
		colors = defaultColors,
		colorMode = defaultColorMode,
		size = defaultSize
	} = props;

	return { logo: merge(logo({ theme, size }), keyframe({ theme, color, colors, colorMode, size })) };
});
