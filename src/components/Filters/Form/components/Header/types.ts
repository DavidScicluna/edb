import { ReactElement } from 'react';

import { ButtonSize, ButtonVariant} from '@davidscicluna/component-library';

import { TextProps } from '@chakra-ui/react';

import { Color, FontSizes } from '../../../../../theme/types';

export type RenderMessageProps = {
	color: string;
	fontSize: keyof FontSizes;
	fontWeight: TextProps['fontWeight'];
};

export type RenderButtonProps = {
	color: keyof Color;
	size: ButtonSize;
	variant: ButtonVariant;
};

export type HeaderProps = {
	label: string;
	renderMessage: (props: RenderMessageProps) => ReactElement | undefined;
	renderButton: (props: RenderButtonProps) => ReactElement;
};
