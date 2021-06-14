import { Style } from '../../../../../../../../common/types/types';
import { Theme } from '../../../../../../../../theme/types';

type NavItemChildStyle = {
  common: {
    child: Style;
    link: Style;
  };
  light: {
    child: Style;
  };
  dark: {
    child: Style;
  };
};

export default (theme: Theme, isActive = false, isExpanded = false, isLastChild = false): NavItemChildStyle => ({
  common: {
    child: {
      'cursor': 'pointer',

      'backgroundColor': 'transparent',
      'borderRadius': isExpanded ? 'base' : isLastChild ? `0 0 ${theme.radii.base} ${theme.radii.base}` : 'none',

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '& .chakra-text': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      }
    },
    link: {
      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '&:hover': {
        textDecoration: 'none'
      },
      '&:focus': {
        boxShadow: 'none'
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
