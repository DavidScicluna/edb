import { Style, utils } from '@davidscicluna/component-library';

import { isClickable as defaultIsClickable, size as defaultSize } from '../../data/defaultPropValues';
import { getSizeConfig } from '../../utils';

import { LogoStyleProps } from './types';

const { checkIsTouchDevice } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

// transition: [
//   `width, ${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`,
//   `padding, ${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`,
//   `font-size, ${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`,
//   `background-color ${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,
//   `border-color ${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,
//   `color ${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
// ]
//   .filter((style) => style)
//   .join(', ')

export default ({ theme, isClickable = defaultIsClickable, size = defaultSize }: LogoStyleProps): Style => {
	const config = getSizeConfig({ size });
	const width = config.width;
	const height = config.height;
	const fontSize = config.fontSize;
	const radius = config.radius;
	const border = config.border;

	const transition = 'none';
	const transitionProperty = ['width', 'height', 'background', 'background-color', 'border-color', 'color'];
	const transitionDuration = theme.transition.duration['ultra-slow'];
	const transitionTimingFunction = theme.transition.easing['ease-in-out'];

	return {
		'cursor': isClickable ? 'pointer' : 'default',

		'pointerEvents': isClickable ? 'auto' : 'none',

		'width': `${width}`,
		'height': `${height}`,

		'minWidth': 'auto',
		'minHeight': 'auto',
		'maxWidth': 'none',
		'maxHeight': 'none',

		'display': 'inline-flex',
		'alignItems': 'center',
		'justifyContent': 'center',

		'userSelect': 'none',
		'willChange': 'auto',

		'outline': !isTouchDevice ? '0px transparent' : 'none !important',

		'borderWidth': `${border}px`,
		'borderStyle': 'solid',
		'borderColor': theme.colors.transparent,
		'borderRadius': theme.radii[radius],

		'fontFamily': '"Pacifico", cursive',
		'fontSize': theme.fontSizes[fontSize],
		'fontWeight': theme.fontWeights.normal,
		'textTransform': 'lowercase',
		'whiteSpace': 'nowrap',
		'lineHeight': theme.lineHeights.base,
		'letterSpacing': '.6px',

		'WebkitTapHighlightColor': theme.colors.transparent,

		'transition': transition,
		'transitionProperty': transitionProperty,
		'transitionDuration': transitionDuration,
		'transitionTimingFunction': transitionTimingFunction,

		'&:focus:not(:focus-visible)': {
			outline: !isTouchDevice ? '0px transparent' : 'none !important'
		},

		'&:focus': {
			boxShadow: 'none',
			outline: !isTouchDevice ? '0px transparent' : 'none !important'
		},

		'&:active': {
			outline: !isTouchDevice ? '0px transparent' : 'none !important'
		},

		'*, *::before, *::after': {
			transition,
			transitionProperty,
			transitionDuration,
			transitionTimingFunction
		}
	};
};
