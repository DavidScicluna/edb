import { Style, utils } from '@davidscicluna/component-library';

import { color as defaultColor } from '../../../../../common/data/defaultPropValues';

import { QueryEmptyIconLightStylingProps } from './types';

const { getHue } = utils;

export default ({ theme, color = defaultColor }: QueryEmptyIconLightStylingProps): Style => {
	const colorShade = getHue({
		colorMode: 'light',
		type: 'background'
	});
	const backgroundShade = getHue({
		colorMode: 'light',
		type: 'color'
	});

	return {
		color: theme.colors.gray[colorShade],
		borderColor: theme.colors[color][backgroundShade],
		backgroundColor: theme.colors[color][backgroundShade],
		background: theme.colors[color][backgroundShade]
	};
};
