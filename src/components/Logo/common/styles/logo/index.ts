import { Style, utils } from '@davidscicluna/component-library';

import {
	isClickable as defaultIsClickable,
	isSquare as defaultIsSquare,
	size as defaultSize
} from '../../data/defaultPropValues';
import { getSizeConfig } from '../../utils';

import { LogoStyleProps } from './types';

const { checkIsTouchDevice } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

export default ({
	theme,
	isClickable = defaultIsClickable,
	isSquare = defaultIsSquare,
	size = defaultSize
}: LogoStyleProps): Style => {
	const config = getSizeConfig({ isSquare, size });
	const width = config.width;
	const height = config.height;
	const fontSize = config.fontSize;
	const radius = config.radius;
	const border = config.border;
	const padding = config.padding;

	const transition = 'none';
	const transitionProperty = [
		'width',
		'height',
		'background',
		'background-color',
		'border-color',
		'color',
		'font-size'
	].join(', ');
	const transitionDuration = theme.transition.duration.slow;
	const transitionTimingFunction = theme.transition.easing['ease-in-out'];

	return {
		'cursor': isClickable ? 'pointer' : 'default',

		'pointerEvents': isClickable ? 'auto' : 'none',

		'width': `${width}px`,
		'height': `${height}px`,

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
		'fontSize': `${fontSize}%`,
		'fontWeight': theme.fontWeights.normal,
		'textTransform': 'lowercase',
		'whiteSpace': 'nowrap',
		'lineHeight': theme.lineHeights.base,
		'letterSpacing': '.6px',

		'WebkitTapHighlightColor': theme.colors.transparent,

		'p': theme.space[padding],

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
