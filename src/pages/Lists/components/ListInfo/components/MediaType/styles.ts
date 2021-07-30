import { Style } from '../../../../../../common/types/types';
import { MediaTypeProps } from './types';

type MediaTypeStyle = {
  common: Style;
  light: Style;
  dark: Style;
};

export default ({ mediaType }: MediaTypeProps): MediaTypeStyle => ({
  common: {
    borderRadius: 'xl',
    bgGradient: `linear(to-tr, ${mediaType === 'movie' ? 'blue.400' : 'pink.400'}, ${
      mediaType === 'movie' ? 'cyan.400' : 'red.400'
    })`,

    padding: 2
  },
  light: {
    '& .chakra-icon': {
      color: 'gray.50'
    },
    '& .chakra-text': {
      color: 'gray.50'
    }
  },
  dark: {
    '& .chakra-icon': {
      color: 'gray.900'
    },
    '& .chakra-text': {
      color: 'gray.900'
    }
  }
});
