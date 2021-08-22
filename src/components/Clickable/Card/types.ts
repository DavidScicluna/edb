import { ReactElement, ReactNode } from 'react';

import { BoxProps } from '@chakra-ui/react';

import { ColorMode } from '../../../common/types/types';
import { Theme } from '../../../store/slices/User/types';

export type CardProps = {
  children: ReactElement | ReactNode;
  color?: Theme['color'];
  colorMode?: ColorMode;
  isFullWidth?: boolean;
  isLightGray?: boolean;
  isDisabled?: boolean;
  isClickable?: boolean;
} & BoxProps;
