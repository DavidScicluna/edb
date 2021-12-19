import { ColorMode } from '@chakra-ui/react';

import { NonNullable } from '../../../../../common/types';
import { ButtonProps, Size, Variant } from '../../types';

export type SpinnerProps = {
  color: NonNullable<ButtonProps['color']>;
  colorMode?: ColorMode;
  size: Size;
  variant?: Variant;
};
