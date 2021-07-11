import { ReactElement, ReactNode } from 'react';

import { BoxProps } from '@chakra-ui/react';

import { CardVariant } from '../../common/types/types';
import { Theme } from '../../store/slices/User/types';

export type CardProps = {
  children: ReactElement | ReactNode;
  color?: Theme['color'];
  isFullWidth?: boolean;
  variant?: CardVariant;
} & BoxProps;
