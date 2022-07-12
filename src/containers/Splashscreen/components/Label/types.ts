import { ColorMode, TextProps } from '@chakra-ui/react';

export type LabelProps = {
	colorMode: ColorMode;
} & Omit<TextProps, 'children'>;
