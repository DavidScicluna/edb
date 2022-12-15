import { Style } from '@davidscicluna/component-library';

import { SearchedDummyKeywordStyleProps } from './types';

export default ({ theme }: SearchedDummyKeywordStyleProps): Style => {
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
		'cursor': 'default',

		'pointerEvents': 'none',

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
		'justifyContent': 'flex-start',

		'userSelect': 'none',
		'willChange': 'auto',

		'borderRadius': theme.radii.base,

		'WebkitTapHighlightColor': theme.colors.transparent,

		'px': theme.space[2],
		'py': theme.space[1],

		'transition': transition,
		'transitionProperty': transitionProperty,
		'transitionDuration': transitionDuration,
		'transitionTimingFunction': transitionTimingFunction,

		'*, *::before, *::after': {
			transition,
			transitionProperty,
			transitionDuration,
			transitionTimingFunction
		}
	};
};
