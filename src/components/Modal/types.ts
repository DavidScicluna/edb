import { ReactElement } from 'react';

import { ButtonSize, Color } from '@davidscicluna/component-library';

import { ColorMode, ModalProps as CUIModalProps } from '@chakra-ui/react';

export type RenderActionsProps = {
	color?: Color;
	colorMode?: ColorMode;
	size?: ButtonSize;
};

export type ModalProps = {
	title: ReactElement | string;
	renderActions?: ({ color, colorMode, size }: RenderActionsProps) => ReactElement;
	colorMode?: ColorMode;
	isConfirm?: boolean;
	hasCancel?: boolean;
} & CUIModalProps;
