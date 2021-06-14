import { Color } from '../../../../theme/types';

export default {
  handleReturnColors: (type: 'start' | 'end', color: Color): string => {
    switch (color) {
      default:
        return type === 'start' ? 'gray.200' : 'gray.400';
    }
  }
};
