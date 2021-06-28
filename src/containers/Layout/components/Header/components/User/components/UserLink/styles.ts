import { Style } from '../../../../../../../../common/types/types';
import { Theme } from '../../../../../../../../theme/types';

type NavItemStyle = {
  common: {
    link: Style;
    container: Style;
  };
  light: Style;
  dark: Style;
};

export default (theme: Theme, isActive = false): NavItemStyle => ({
  common: {
    link: {
      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '&:hover': {
        textDecoration: 'none'
      },
      '&:focus': {
        boxShadow: 'none'
      }
    },
    container: {
      'cursor': 'pointer',

      'borderRadius': 'base',

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '& .chakra-icon': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      },
      '& .chakra-text': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      }
    }
  },
  light: {
    'backgroundColor': isActive ? 'blue.400' : 'transparent',

    '& .chakra-icon': {
      color: isActive ? 'gray.50' : 'gray.400'
    },
    '& .chakra-text': {
      color: isActive ? 'gray.50' : 'gray.400'
    },

    '&:hover': {
      'backgroundColor': isActive ? 'blue.500' : 'gray.100',

      '& .chakra-icon': {
        color: isActive ? 'gray.50' : 'gray.900'
      },
      '& .chakra-text': {
        color: isActive ? 'gray.50' : 'gray.900'
      }
    }
  },
  dark: {
    'backgroundColor': isActive ? 'blue.400' : 'transparent',

    '& .chakra-icon': {
      color: isActive ? 'gray.900' : 'gray.500'
    },
    '& .chakra-text': {
      color: isActive ? 'gray.900' : 'gray.500'
    },

    '&:hover': {
      'backgroundColor': isActive ? 'blue.500' : 'gray.800',

      '& .chakra-icon': {
        color: isActive ? 'gray.900' : 'gray.50'
      },
      '& .chakra-text': {
        color: isActive ? 'gray.900' : 'gray.50'
      }
    }
  }
});
