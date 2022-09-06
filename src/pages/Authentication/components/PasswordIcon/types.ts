import { IconProps } from '@davidscicluna/component-library';

import { ColorMode, CenterProps } from '@chakra-ui/react';

type SetProps = {
	on: () => void;
	off: () => void;
	toggle: () => void;
};

export type PasswordIconProps = Omit<CenterProps, 'children'> & {
	colorMode?: ColorMode;
	label?: string;
	isVisible?: boolean;
	isHovering?: boolean;
	setIsVisible: SetProps;
	setIsHovering: SetProps;
	iconProps?: Omit<IconProps, 'icon' | 'category'>;
};
