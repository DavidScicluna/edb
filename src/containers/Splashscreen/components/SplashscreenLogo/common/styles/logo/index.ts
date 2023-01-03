import { Style } from '@davidscicluna/component-library';

import { size as defaultSize } from '../../data/defaultPropValues';

import { SplashscreenLogoStyleProps } from './types';

export default ({ theme, size = defaultSize }: SplashscreenLogoStyleProps): Style => {
	const transition = 'none !important';

	return {
		'cursor': 'default',

		'pointerEvents': 'none',

		'width': `${size}px`,
		'height': `${size}px`,

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

		'fontFamily': '"Pacifico", cursive',
		'fontWeight': theme.fontWeights.normal,
		'fontSize': ['100px', '150px', '200px', '250px', '250px', '300px'],
		'textTransform': 'lowercase',
		'whiteSpace': 'nowrap',
		'lineHeight': theme.lineHeights.base,
		'letterSpacing': '.6px',

		'p': 6,

		'transition': transition,
		'transitionProperty': transition,
		'transitionDuration': transition,
		'transitionTimingFunction': transition,

		'*, *::before, *::after': {
			transition: transition,
			transitionProperty: transition,
			transitionDuration: transition,
			transitionTimingFunction: transition
		}
	};
};
