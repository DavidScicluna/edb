import { ColorMode } from '@chakra-ui/react';

import { NonNullable } from '../../../../../common/types';
import { IconButtonProps, Size, Variant } from '../../types';

export type SpinnerProps = {
  color: NonNullable<IconButtonProps['color']>;
  colorMode?: ColorMode;
  size: Size;
  variant?: Variant;
};
