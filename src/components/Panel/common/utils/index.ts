import { Space } from '../../../../theme/types';
import { Size, Variant } from '../../types';

/**
 * This method will return the appropriate padding depending on the size passed
 *
 * @returns - number: Padding value
 */
export const handleReturnPadding = (size: Size, _variant: Variant): keyof Space => {
  switch (size) {
    case 'xs':
      return 1;
    case 'sm':
      return 1.5;
    case 'lg':
      return 2.5;
    case 'xl':
      return 3;
    default:
      return 2;
  }
};
