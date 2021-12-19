import { ColorMode } from '@chakra-ui/react';

import { IconButtonProps, Size, Variant } from '../../types';

type NonNullable<T> = Exclude<T, null | undefined>;

export type SpinnerProps = {
  color: NonNullable<IconButtonProps['color']>;
  colorMode?: ColorMode;
  size: Size;
  variant?: Variant;
};
