import { Space } from '../../../../theme/types';
import { Size, Variant } from '../../types';

/**
 * This method will return the appropriate padding depending on the size passed
 *
 * @returns - number: Padding value
 */
export const handleReturnPadding = (size: Size, variant: Variant): keyof Space => {
  switch (size) {
    case 'xs':
      return variant === 'outlined' ? 1 : 0.5;
    case 'sm':
      return variant === 'outlined' ? 1.5 : 0.75;
    case 'lg':
      return variant === 'outlined' ? 2.5 : 1.25;
    case 'xl':
      return variant === 'outlined' ? 3 : 1.5;
    default:
      return variant === 'outlined' ? 2 : 1;
  }
};
