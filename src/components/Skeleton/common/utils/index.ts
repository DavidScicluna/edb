import { ColorMode } from '@chakra-ui/react';

import { Color, Theme } from '../../../../theme/types';

export const handleReturnColors = (
  theme: Theme,
  type: 'start' | 'end',
  color: keyof Color,
  colorMode: ColorMode
): string => {
  return theme.colors[color][colorMode === 'light' ? (type === 'start' ? 200 : 400) : type === 'start' ? 700 : 500];
};
