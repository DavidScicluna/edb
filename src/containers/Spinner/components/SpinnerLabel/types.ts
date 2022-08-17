import { ColorMode, TextProps } from '@chakra-ui/react';

export type SpinnerLabelProps = {
	colorMode: ColorMode;
} & Omit<TextProps, 'children'>;
