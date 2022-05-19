import { ReactNode } from 'react';

import { ColorMode, InputProps as CUIInputProps } from '@chakra-ui/react';

import { ErrorOption } from 'react-hook-form';


import { Style } from '../../../common/types';
import { Color } from '../../../theme/types';

export type RenderProps = {
	width: number;
	height: number;
	fontSize: 'xs' | 'sm' | 'md';
};

type AutoComplete = 'on' | 'password' | 'off';

export type Size = 'sm' | 'md' | 'lg';

export type InputProps = {
	autoComplete?: AutoComplete;
	color: Omit<keyof Color, 'gray' | 'red'>;
	colorMode?: ColorMode;
	label?: string;
	error?: ErrorOption;
	isFullWidth?: boolean;
	renderInputLeftPanel?: (props: RenderProps) => ReactNode;
	renderInputRightPanel?: (props: RenderProps) => ReactNode;
	size?: Size;
	sx?: { group?: Style; input?: Style; formLabel?: Style; formHelperText?: Style };
} & Omit<
	CUIInputProps,
	'autoComplete' | 'colorScheme' | 'errorBorderColor' | 'focusBorderColor' | 'isInvalid' | 'size' | 'variant' | 'sx'
>;
