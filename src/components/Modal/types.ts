import { ReactElement } from 'react';

import { ColorMode, ModalProps as CUIModalProps } from '@chakra-ui/react';

import { Size } from '../../components/Clickable/Button/types';
import { Color } from '../../theme/types';

export type RenderActionsProps = {
	color?: keyof Color;
	colorMode?: ColorMode;
	size?: Size;
};

export type ModalProps = {
	title: ReactElement | string;
	renderActions?: ({ color, colorMode, size }: RenderActionsProps) => ReactElement;
	colorMode?: ColorMode;
	isConfirm?: boolean;
	hasCancel?: boolean;
} & CUIModalProps;
