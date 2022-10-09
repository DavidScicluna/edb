import { Style, utils } from '@davidscicluna/component-library';

import { SearchListItemStyleProps } from './types';

const { checkIsTouchDevice } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

export default ({ theme }: SearchListItemStyleProps): Style => {
	const transition = 'none';
	const transitionProperty = [
		'width',
		'height',
		'background',
		'background-color',
		'border-color',
		'border-radius',
		'color',
		'font-size',
		'padding'
	].join(', ');
	const transitionDuration = theme.transition.duration.slow;
	const transitionTimingFunction = theme.transition.easing['ease-in-out'];

	return {
		'cursor': 'pointer',

		'pointerEvents': 'auto',

		'width': '100%',
		'height': 'auto',

		'minWidth': 'auto',
		'minHeight': 'auto',
		'maxWidth': 'none',
		'maxHeight': 'none',

		'display': 'flex',
		'flexDirection': 'row',
		'flexWrap': 'nowrap',
		'alignItems': 'center',
		'justifyContent': 'space-between',

		'userSelect': 'none',
		'willChange': 'auto',

		'outline': !isTouchDevice ? '0px transparent' : 'none !important',

		'borderRadius': theme.radii.base,

		'WebkitTapHighlightColor': theme.colors.transparent,

		'px': theme.space[2],
		'py': theme.space[1],

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
