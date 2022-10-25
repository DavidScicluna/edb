import { ReactNode } from 'react';

import { ButtonProps, FontSize } from '@davidscicluna/component-library';

import { TextProps } from '@chakra-ui/react';

export type RenderMessageProps = Pick<TextProps, 'color' | 'fontWeight' | 'whiteSpace'> & { fontSize: FontSize };

export type RenderButtonProps = Pick<ButtonProps, 'color' | 'colorMode' | 'size' | 'variant'>;

export type CommonFiltersFormCardHeadersProps = {
	title: string;
	subtitle?: string;
	renderMessage?: (props: RenderMessageProps) => ReactNode;
	renderButton: (props: RenderButtonProps) => ReactNode;
};

export type FiltersFormCardHeadersContext = {
	renderMessageProps: RenderMessageProps;
	renderButtonProps: RenderButtonProps;
};
