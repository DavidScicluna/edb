import { ErrorOption } from 'react-hook-form';

import { ColorMode, TextareaProps as CUITextareaProps } from '@chakra-ui/react';

import { Style } from '../../../common/types';
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
	sx?: { textarea?: Style; formLabel?: Style; formHelperText?: Style };
} & Omit<
	CUITextareaProps,
	'autoComplete' | 'colorScheme' | 'errorBorderColor' | 'focusBorderColor' | 'isInvalid' | 'size' | 'variant' | 'sx'
>;
