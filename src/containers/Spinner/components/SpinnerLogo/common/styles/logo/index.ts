import { Style } from '@davidscicluna/component-library';

import { SplashscreenLogoStyleProps } from './types';

export default ({ theme }: SplashscreenLogoStyleProps): Style => {
	const transition = `${theme.transition.duration.slow} ${theme.transition.easing['ease-in-out']}`;

	return {
		'cursor': 'default',

		'pointerEvents': 'none',

		'minWidth': 'auto',
		'minHeight': 'auto',
		'maxWidth': 'none',
		'maxHeight': 'none',

		'display': 'inline-flex',
		'alignItems': 'center',
		'justifyContent': 'center',

		'userSelect': 'none',
		'willChange': 'auto',

		'border': 'none',
		'borderRadius': theme.radii.full,

		'background': 'none',

		'fontFamily': '"Pacifico", cursive',
		'fontWeight': theme.fontWeights.normal,
		'textTransform': 'lowercase',
		'whiteSpace': 'nowrap',
		'lineHeight': theme.lineHeights.base,
		'letterSpacing': '.6px',

		'transition': transition,

		'*, *::before, *::after': { transition }
	};
};
