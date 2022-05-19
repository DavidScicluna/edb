import { ReactElement } from 'react';

import { ButtonSize} from '@davidscicluna/component-library';

import { ColorMode, ModalProps as CUIModalProps } from '@chakra-ui/react';

import { Color } from '../../theme/types';

export type RenderActionsProps = {
	color?: keyof Color;
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
