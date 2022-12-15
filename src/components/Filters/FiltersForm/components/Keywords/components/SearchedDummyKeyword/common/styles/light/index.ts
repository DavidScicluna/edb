import { Style, utils } from '@davidscicluna/component-library';

import { SearchedDummyKeywordLightStylingProps } from './types';

const { getHue } = utils;

export default ({ theme }: SearchedDummyKeywordLightStylingProps): Style => {
	const textShade = getHue({ colorMode: 'light', type: 'text.primary' });

	return {
		color: theme.colors.gray[textShade],
		borderColor: theme.colors.transparent,
		backgroundColor: theme.colors.transparent,
		background: theme.colors.transparent
	};
};
