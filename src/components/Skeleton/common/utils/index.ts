import { ColorMode } from '@chakra-ui/react';

import { Color } from '../../../../theme/types';

export const handleReturnColors = (type: 'start' | 'end', color: keyof Color, colorMode: ColorMode): string => {
  switch (color) {
    default:
      return colorMode === 'light'
        ? type === 'start'
          ? 'gray.200'
          : 'gray.400'
        : type === 'start'
        ? 'gray.700'
        : 'gray.500';
  }
};
