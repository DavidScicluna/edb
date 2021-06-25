import { Style } from '../../../../../../common/types/types';
import { Theme } from '../../../../../../theme/types';

type NavItemStyle = {
  common: {
    container: Style;
    main: Style;
    link: Style;
  };
  light: {
    container: Style;
    main: Style;
  };
  dark: {
    container: Style;
    main: Style;
  };
};

export default (
  theme: Theme,
  isActive = false,
  isChildActive = false,
  renderChildren = false,
  isExpanded = false,
  isOpen = false
): NavItemStyle => ({
  common: {
    container: {
      borderRadius: 'base',

      transition: `${theme.transition.duration.slower} ${theme.transition.easing['ease-in-out']}`
    },
    main: {
      'cursor': 'pointer',

      'borderRadius': !isExpanded && isOpen && renderChildren ? `${theme.radii.base} ${theme.radii.base} 0 0` : 'base',

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '& .chakra-icon': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      },
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
    container: {
      backgroundColor: !isExpanded && isOpen && renderChildren ? 'gray.100' : 'transparent'
    },
    main: {
      'backgroundColor': isChildActive ? 'transparent' : isActive ? 'blue.400' : 'transparent',

      '& .chakra-icon': {
        color: isChildActive ? 'blue.400' : isActive ? 'gray.50' : 'gray.400'
      },
      '& .chakra-text': {
        color: isChildActive ? 'blue.400' : isActive ? 'gray.50' : 'gray.400'
      },

      '&:hover': {
        'backgroundColor': isChildActive ? 'gray.100' : isActive ? 'blue.500' : 'gray.100',

        '& .chakra-icon': {
          color: isChildActive ? 'blue.400' : isActive ? 'gray.50' : 'gray.900'
        },
        '& .chakra-text': {
          color: isChildActive ? 'blue.400' : isActive ? 'gray.50' : 'gray.900'
        }
      }
    }
  },
  dark: {
    container: {
      backgroundColor: !isExpanded && isOpen && renderChildren ? 'gray.800' : 'transparent'
    },
    main: {
      'backgroundColor': isChildActive ? 'transparent' : isActive ? 'blue.400' : 'transparent',

      '& .chakra-icon': {
        color: isChildActive ? 'blue.400' : isActive ? 'gray.900' : 'gray.500'
      },
      '& .chakra-text': {
        color: isChildActive ? 'blue.400' : isActive ? 'gray.900' : 'gray.500'
      },

      '&:hover': {
        'backgroundColor': isChildActive ? 'gray.800' : isActive ? 'blue.500' : 'gray.800',

        '& .chakra-icon': {
          color: isChildActive ? 'blue.400' : isActive ? 'gray.900' : 'gray.50'
        },
        '& .chakra-text': {
          color: isChildActive ? 'blue.400' : isActive ? 'gray.900' : 'gray.50'
        }
      }
    }
  }
});
