import { Style } from '../../../../../../common/types/types';
import { Theme as UserTheme } from '../../../../../../store/slices/User/types';
import { Theme } from '../../../../../../theme/types';
type ListItemStyle = {
  common: { container: Style; text: { primary: Style; secondary: Style } };
  light: { container: Style; text: { primary: Style; secondary: Style } };
  dark: { container: Style; text: { primary: Style; secondary: Style } };
};

export default (theme: Theme, color: UserTheme['color'], isActive = false): ListItemStyle => ({
  common: {
    container: {
      'cursor': 'pointer',

      'width': '100%',
      'height': '100%',

      'border': 'solid2',
      'borderRadius': 'lg',

      'transform': isActive ? 'translateY(2px)' : 'translateY(0)',

      'padding': 4,

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '&:focus': {
        transform: isActive ? 'translateY(2px)' : 'translateY(0)'
      },

      '&:hover': {
        transform: isActive ? 'translateY(2px)' : 'translateY(0)'
      },

      '&:active': {
        boxShadow: '0 0 transparent',

        transform: !isActive ? 'translateY(2px)' : 'none'
      },

      '& .chakra-icon': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      },
      '& .chakra-text': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      }
    },
    text: {
      primary: {
        align: 'left',
        fontSize: 'md',
        fontWeight: 'semibold',
        textTransform: 'capitalize'
      },
      secondary: {
        align: 'left',
        fontSize: 'xs',
        fontWeight: '400',
        textTransform: 'capitalize'
      }
    }
  },
  light: {
    container: {
      'borderColor': isActive ? `${color}.400` : 'gray.400',
      'backgroundColor': isActive ? `${color}.50` : 'transparent',
      'boxShadow': isActive ? 'none' : `0 2px ${theme.colors.gray[400]}`,

      '&:focus': {
        boxShadow: isActive ? 'none' : `0 2px ${theme.colors.gray[400]}`
      },

      '&:hover': {
        borderColor: isActive ? `${color}.600` : 'gray.600',
        backgroundColor: isActive ? `${color}.200` : 'transparent',

        boxShadow: isActive ? 'none' : `0 2px ${theme.colors.gray[600]}`
      },

      '&:active': {
        borderColor: isActive ? `${color}.600` : 'gray.600',
        backgroundColor: isActive ? `${color}.200` : 'transparent'
      }
    },
    text: {
      primary: {
        color: isActive ? `${color}.400` : 'gray.900'
      },
      secondary: {
        color: isActive ? `${color}.400` : 'gray.400'
      }
    }
  },
  dark: {
    container: {
      'borderColor': isActive ? `${color}.400` : 'gray.500',
      'backgroundColor': isActive ? `${color}.50` : 'transparent',
      'boxShadow': isActive ? 'none' : `0 2px ${theme.colors.gray[500]}`,

      '&:focus': {
        boxShadow: isActive ? 'none' : `0 2px ${theme.colors.gray[500]}`
      },

      '&:hover': {
        borderColor: isActive ? `${color}.600` : 'gray.300',
        backgroundColor: isActive ? `${color}.100` : 'transparent',

        boxShadow: isActive ? 'none' : `0 2px ${theme.colors.gray[300]}`
      },

      '&:active': {
        borderColor: isActive ? `${color}.600` : 'gray.300',
        backgroundColor: isActive ? `${color}.100` : 'transparent'
      }
    },
    text: {
      primary: {
        color: isActive ? `${color}.400` : 'gray.50'
      },
      secondary: {
        color: isActive ? `${color}.400` : 'gray.500'
      }
    }
  }
});
