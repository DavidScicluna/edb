import { ReactElement, ReactNode } from 'react';

import { AspectRatioProps } from '@chakra-ui/react';

import { FontSizes, Color } from '../../../theme/types';

export type IconProps = {
	color: Color['gray'][50] | Color['gray'][900];
	fontSize: FontSizes['6xl'] | FontSizes['7xl'];
};

export type ImageProps = {
	children: ReactElement;
	width?: AspectRatioProps['width'];
	borderRadius?: AspectRatioProps['borderRadius'];
	ratio?: AspectRatioProps['ratio'];
	renderIcon: (props: IconProps) => ReactNode;
	isDisabled?: boolean;
	isActive?: boolean;
	onClick?: () => void;
};
