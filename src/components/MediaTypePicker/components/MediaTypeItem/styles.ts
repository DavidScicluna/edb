import { Style } from '../../../../common/types/types';
import { Theme as UserTheme } from '../../../../store/slices/User/types';
import { Theme } from '../../../../theme/types';

type MediaTypeItemStyle = {
  common: { container: Style; icon: Style; text: Style };
  light: { container: Style; icon: Style; text: Style };
  dark: { container: Style; icon: Style; text: Style };
};

export default (theme: Theme, color: UserTheme['color'], isActive = false): MediaTypeItemStyle => ({
  common: {
    container: {
      'cursor': 'pointer',

      'width': '100%',

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
    icon: {
      '&.MuiSvgIcon-root': {
        fontSize: theme.fontSizes['6xl']
      }
    },
    text: {
      align: 'center',
      fontSize: 'xl',
      fontWeight: 'semibold',
      textTransform: 'uppercase'
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
        'borderColor': isActive ? `${color}.600` : 'gray.600',
        'backgroundColor': isActive ? `${color}.200` : 'transparent',

        'boxShadow': isActive ? 'none' : `0 2px ${theme.colors.gray[600]}`,

        '& .chakra-icon': {
          color: isActive ? `${color}.600` : 'gray.600'
        },
        '& .chakra-text': {
          color: isActive ? `${color}.600` : 'gray.600'
        }
      },

      '&:active': {
        'borderColor': isActive ? `${color}.600` : 'gray.600',
        'backgroundColor': isActive ? `${color}.200` : 'transparent',

        '& .chakra-icon': {
          color: isActive ? `${color}.600` : 'gray.600'
        },
        '& .chakra-text': {
          color: isActive ? `${color}.600` : 'gray.600'
        }
      }
    },
    icon: {
      color: isActive ? `${color}.400` : 'gray.400'
    },
    text: {
      color: isActive ? `${color}.400` : 'gray.400'
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
        'borderColor': isActive ? `${color}.600` : 'gray.300',
        'backgroundColor': isActive ? `${color}.100` : 'transparent',

        'boxShadow': isActive ? 'none' : `0 2px ${theme.colors.gray[300]}`,

        '& .chakra-icon': {
          color: isActive ? `${color}.600` : 'gray.500'
        },
        '& .chakra-text': {
          color: isActive ? `${color}.600` : 'gray.500'
        }
      },

      '&:active': {
        'borderColor': isActive ? `${color}.600` : 'gray.300',
        'backgroundColor': isActive ? `${color}.100` : 'transparent',

        '& .chakra-icon': {
          color: isActive ? `${color}.600` : 'gray.500'
        },
        '& .chakra-text': {
          color: isActive ? `${color}.600` : 'gray.500'
        }
      }
    },
    icon: {
      color: isActive ? `${color}.400` : 'gray.500'
    },
    text: {
      color: isActive ? `${color}.400` : 'gray.500'
    }
  }
});
