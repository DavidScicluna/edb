import { ColorMode } from '@chakra-ui/react';

import { SplashscreenColor } from '../../types';

export type LetterProps = {
	color: SplashscreenColor;
	colorMode: ColorMode;
	letter: string;
	delay: number;
};
