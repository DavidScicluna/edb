import { ReactElement, ReactNode, MouseEvent as ReactMouseEvent } from 'react';

import { AspectRatioProps, ColorMode } from '@chakra-ui/react';

export type IconProps = {
	color?: string;
	colorMode?: ColorMode;
	fontSize?: string;
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
	onClick?: (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
};
