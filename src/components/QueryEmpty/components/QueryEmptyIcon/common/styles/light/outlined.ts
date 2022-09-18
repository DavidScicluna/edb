import { Style, utils } from '@davidscicluna/component-library';

import { color as defaultColor } from '../../../../../common/data/defaultPropValues';

import { QueryEmptyIconLightStylingProps } from './types';

const { getHue } = utils;

export default ({ theme, color = defaultColor }: QueryEmptyIconLightStylingProps): Style => {
	const shade = getHue({
		colorMode: 'light',
		type: 'color'
	});

	return {
		color: theme.colors[color][shade],
		borderColor: theme.colors[color][shade],
		backgroundColor: theme.colors.transparent,
		background: theme.colors.transparent
	};
};
