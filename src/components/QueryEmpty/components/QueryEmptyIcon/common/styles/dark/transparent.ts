import { Style, utils } from '@davidscicluna/component-library';

import { color as defaultColor } from '../../../../../common/data/defaultPropValues';

import { QueryEmptyIconDarkStylingProps } from './types';

const { getHue } = utils;

export default ({ theme, color = defaultColor }: QueryEmptyIconDarkStylingProps): Style => {
	const shade = getHue({
		colorMode: 'dark',
		type: 'color'
	});

	return {
		color: theme.colors[color][shade],
		borderColor: theme.colors.transparent,
		backgroundColor: theme.colors.transparent,
		background: theme.colors.transparent
	};
};
