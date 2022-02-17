import { ErrorOption } from 'react-hook-form';

import { ColorMode, InputProps as CUIInputProps } from '@chakra-ui/react';

import { Color } from '../../../theme/types';

type AutoComplete = 'on' | 'password' | 'off';

export type Size = 'sm' | 'md' | 'lg';

export type InputProps = {
  autoComplete?: AutoComplete;
  color: Omit<keyof Color, 'gray' | 'red'>;
  colorMode?: ColorMode;
  label?: string;
  error?: ErrorOption;
  isFullWidth?: boolean;
  size?: Size;
  sx?: {
    input?: CUIInputProps['sx'];
    formLabel?: CUIInputProps['sx'];
    formHelperText?: CUIInputProps['sx'];
  };
} & Omit<
  CUIInputProps,
  'autoComplete' | 'colorScheme' | 'errorBorderColor' | 'focusBorderColor' | 'isInvalid' | 'size' | 'variant' | 'sx'
>;
