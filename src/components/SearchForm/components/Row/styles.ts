import { Style } from '../../../../common/types/types';
import { Theme } from '../../../../theme/types';
import { RowProps } from './types';

type RowStyle = {
  common: Style;
  light: Style;
  dark: Style;
};

export default (theme: Theme, type?: RowProps['type']): RowStyle => ({
  common: {
    'cursor': 'pointer',

    'width': '100%',

    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'justifyContent': 'space-between',

    'borderRadius': theme.radii.base,

    'transition': `${theme.transition.duration['ultra-fast']} ${theme.transition.easing['ease-in-out']}`,

    '& .chakra-icon': {
      transition: `${theme.transition.duration['ultra-fast']} ${theme.transition.easing['ease-in-out']}`
    },
    '& .chakra-text': {
      transition: `${theme.transition.duration['ultra-fast']} ${theme.transition.easing['ease-in-out']}`
    }
  },
  light: {
    'backgroundColor': type === 'isKeyword' ? 'transparent' : 'gray.50',

    '& .chakra-text': {
      color: 'gray.400'
    },

    '&:hover': {
      'backgroundColor': 'gray.100',

      '& .chakra-text': {
        color: 'gray.900'
      }
    },

    '&:focus': {
      'backgroundColor': 'gray.100',

      '& .chakra-text': {
        color: 'gray.900'
      }
    }
  },
  dark: {
    'backgroundColor': type === 'isKeyword' ? 'transparent' : 'gray.900',

    '& .chakra-text': {
      color: 'gray.500'
    },

    '&:hover': {
      'backgroundColor': 'gray.800',

      '& .chakra-text': {
        color: 'gray.50'
      }
    },

    '&:focus': {
      'backgroundColor': 'gray.800',

      '& .chakra-text': {
        color: 'gray.50'
      }
    }
  }
});
