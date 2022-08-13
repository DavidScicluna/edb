import { CenterProps } from '@chakra-ui/react';

type SetProps = {
	on: () => void;
	off: () => void;
	toggle: () => void;
};

export type PasswordIconProps = Omit<CenterProps, 'children'> & {
	label?: string;
	isVisible?: boolean;
	isHovering?: boolean;
	setIsVisible: SetProps;
	setIsHovering: SetProps;
};
