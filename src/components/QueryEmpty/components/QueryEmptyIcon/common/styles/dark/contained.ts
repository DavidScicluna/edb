import { Style, utils } from '@davidscicluna/component-library';

import { color as defaultColor } from '../../../../../common/data/defaultPropValues';

import { QueryEmptyIconDarkStylingProps } from './types';

const { getHue } = utils;

export default ({ theme, color = defaultColor }: QueryEmptyIconDarkStylingProps): Style => {
	const colorShade = getHue({
		colorMode: 'dark',
		type: 'background'
	});
	const backgroundShade = getHue({
		colorMode: 'dark',
		type: 'color'
	});

	return {
		color: theme.colors.gray[colorShade],
		borderColor: theme.colors[color][backgroundShade],
		backgroundColor: theme.colors[color][backgroundShade],
		background: theme.colors[color][backgroundShade]
	};
};
