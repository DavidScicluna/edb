import { ColorMode } from '@chakra-ui/react';

import { UserThemeColor } from '../../../../store/slices/Users/types';

export type AuthenticationIllustrationIndex = 1 | 2 | 3 | 4 | 5 | 6;
export type AuthenticationIllustrationIndexes = AuthenticationIllustrationIndex[];

export type AuthenticationOutletContext = {
	color: UserThemeColor;
	colorMode: ColorMode;
	setColor: (color: UserThemeColor) => void;
	setColorMode: (colorMode: ColorMode) => void;
};
