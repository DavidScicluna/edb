import { Style } from '../../../../../../../../common/types/types';
import { Theme } from '../../../../../../../../theme/types';

type NavItemChildStyle = {
  common: {
    child: Style;
  };
  light: {
    child: Style;
  };
  dark: {
    child: Style;
  };
};

export default (theme: Theme, isActive = false): NavItemChildStyle => ({
  common: {
    child: {
      'cursor': 'pointer',

      'backgroundColor': 'transparent',
      'borderRadius': 'base',

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '& .chakra-text': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      }
    }
  },
  light: {
    child: {
      'backgroundColor': isActive ? 'blue.400' : 'transparent',

      '& .chakra-text': {
        color: isActive ? 'gray.50' : 'gray.400'
      },

      '&:hover': {
        'backgroundColor': isActive ? 'blue.500' : 'gray.100',

        '& .chakra-text': {
          color: isActive ? 'gray.50' : 'gray.900'
        }
      }
    }
  },
  dark: {
    child: {
      'backgroundColor': isActive ? 'blue.400' : 'transparent',

      '& .chakra-text': {
        color: isActive ? 'gray.50' : 'gray.500'
      },

      '&:hover': {
        'backgroundColor': isActive ? 'blue.500' : 'gray.800',

        '& .chakra-text': {
          color: isActive ? 'gray.900' : 'gray.50'
        }
      }
    }
  }
});
