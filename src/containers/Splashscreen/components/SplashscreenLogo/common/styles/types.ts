import { Style, Theme } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { SplashscreenLogoColors, SplashscreenLogoSize } from '../../types';
import { UserThemeColor } from '../../../../../../store/slices/Users/types';

export type SplashscreenLogoStyleProps = {
	theme: Theme;
	color: UserThemeColor;
	colors: SplashscreenLogoColors;
	colorMode: ColorMode;
	size: SplashscreenLogoSize;
};

export type SplashscreenLogoStyleReturn = { logo: Style };
