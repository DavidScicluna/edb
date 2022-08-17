import { ColorMode, TextProps } from '@chakra-ui/react';

export type SplashscreenLabelProps = {
	colorMode: ColorMode;
} & Omit<TextProps, 'children'>;
