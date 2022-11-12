import { ColorMode } from '@chakra-ui/react';

import { UserThemeColor } from '../../../../store/slices/Users/types';

export type AuthenticationOutletContext = {
	color: UserThemeColor;
	colorMode: ColorMode;
	setColor: (color: UserThemeColor) => void;
	setColorMode: (colorMode: ColorMode) => void;
};
