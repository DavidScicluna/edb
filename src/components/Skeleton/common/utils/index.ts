import { ColorMode } from '../../../../common/types/types';
import { Color } from '../../../../theme/types';

export const handleReturnColors = (type: 'start' | 'end', color: Color, colorMode: ColorMode): string => {
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
