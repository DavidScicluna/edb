import { ReactElement } from 'react';

import { Color, FontSize, ButtonSize, ButtonVariant } from '@davidscicluna/component-library';

import { TextProps } from '@chakra-ui/react';

export type RenderMessageProps = {
	color: string;
	fontSize: FontSize;
	fontWeight: TextProps['fontWeight'];
};

export type RenderButtonProps = {
	color: Color;
	size: ButtonSize;
	variant: ButtonVariant;
};

export type HeaderProps = {
	label: string;
	renderMessage: (props: RenderMessageProps) => ReactElement | undefined;
	renderButton: (props: RenderButtonProps) => ReactElement;
};
