import { ReactElement, ReactNode } from 'react';

import { AspectRatioProps, ColorMode } from '@chakra-ui/react';

import { FontSizes, Color } from '../../../theme/types';

export type IconProps = {
	color?: Color['gray'][50] | Color['gray'][900];
	colorMode?: ColorMode;
	fontSize?: FontSizes['6xl'] | FontSizes['7xl'];
};

export type ImageProps = {
	children: ReactElement;
	width?: AspectRatioProps['width'];
	borderRadius?: AspectRatioProps['borderRadius'];
	colorMode?: ColorMode;
	ratio?: AspectRatioProps['ratio'];
	renderIcon: (props: IconProps) => ReactNode;
	isDisabled?: boolean;
	isActive?: boolean;
	onClick?: () => void;
};
