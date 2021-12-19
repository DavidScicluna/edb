import { ReactElement, ReactNode } from 'react';

import { ColorMode, BoxProps } from '@chakra-ui/react';

import { Color } from '../../../theme/types';

export type CardRef = HTMLDivElement | null;

export type CardProps = {
  children: ReactElement | ReactNode;
  color?: keyof Color;
  colorMode?: ColorMode;
  isFullWidth?: boolean;
  isLight?: boolean;
  isDisabled?: boolean;
  isClickable?: boolean;
} & BoxProps;
