import { ReactElement, ReactNode } from 'react';

import { BoxProps } from '@chakra-ui/react';

import { Theme } from '../../../store/slices/User/types';

type Variant = 'transparent' | 'outlined';

export type CardProps = {
  children: ReactElement | ReactNode;
  color?: Theme['color'];
  isFullWidth?: boolean;
  isLightGray?: boolean;
  isDisabled?: boolean;
  variant?: Variant;
} & BoxProps;
