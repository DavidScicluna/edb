import { Style, utils } from '@davidscicluna/component-library';

import { SearchedDummyKeywordDarkStylingProps } from './types';

const { getHue } = utils;

export default ({ theme }: SearchedDummyKeywordDarkStylingProps): Style => {
	const textShade = getHue({ colorMode: 'dark', type: 'text.primary' });

	return {
		color: theme.colors.gray[textShade],
		borderColor: theme.colors.transparent,
		backgroundColor: theme.colors.transparent,
		background: theme.colors.transparent
	};
};
