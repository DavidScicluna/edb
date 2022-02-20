import { ErrorOption } from 'react-hook-form';

import { ColorMode, TextareaProps as CUITextareaProps } from '@chakra-ui/react';

import { Color } from '../../../theme/types';

type AutoComplete = 'on' | 'password' | 'off';

export type Size = 'sm' | 'md' | 'lg';

export type TextareaProps = {
	autoComplete?: AutoComplete;
	color: Omit<keyof Color, 'gray' | 'red'>;
	colorMode?: ColorMode;
	label?: string;
	error?: ErrorOption;
	isFullWidth?: boolean;
	size?: Size;
	sx?: {
		textarea?: CUITextareaProps['sx'];
		formLabel?: CUITextareaProps['sx'];
		formHelperText?: CUITextareaProps['sx'];
	};
} & Omit<
	CUITextareaProps,
	'autoComplete' | 'colorScheme' | 'errorBorderColor' | 'focusBorderColor' | 'isInvalid' | 'size' | 'variant' | 'sx'
>;
