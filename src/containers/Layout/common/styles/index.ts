import { Style } from '@davidscicluna/component-library';

import { memoize } from 'lodash';

import { LayoutStyleProps } from './types';

export default memoize(({ theme }: LayoutStyleProps): Style => {
	const transition = 'none';
	const transitionProperty = ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'].join(', ');
	const transitionDuration = theme.transition.duration.normal;
	const transitionDelay = theme.transition.duration.normal;
	const transitionTimingFunction = theme.transition.easing['ease-in-out'];

	return {
		transition,
		transitionProperty,
		transitionDuration,
		transitionDelay,
		transitionTimingFunction
	};
});
