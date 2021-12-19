import { ColorMode } from '@chakra-ui/react';

import { ButtonProps, Size, Variant } from '../../types';

type NonNullable<T> = Exclude<T, null | undefined>; // Remove null and undefined from T

export type SpinnerProps = {
  color: NonNullable<ButtonProps['color']>;
  colorMode?: ColorMode;
  size: Size;
  variant?: Variant;
};
