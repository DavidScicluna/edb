import { Style } from '../../../../../../../../../common/types/types';
import { Theme } from '../../../../../../../../../theme/types';
import { Color } from '../../types';

type ColorItemStyle = {
  common: {
    button: Style;
    circle: Style;
    icon: Style;
    disabled: Style;
  };
  light: {
    button: Style;
    icon: Style;
    disabled: Style;
  };
  dark: {
    button: Style;
    icon: Style;
    disabled: Style;
  };
};

export default (theme: Theme, color: Color['value']): ColorItemStyle => ({
  common: {
    button: {
      'cursor': 'pointer',
      'touchAction': 'manipulation',
      'userSelect': 'none',

      'width': '100%',
      'height': 'auto',

      'opacity': 1,

      'border': 'solid2',
      'borderRadius': 'md',

      'transform': 'translateY(0)',

      'padding': 1.5,

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '& .chakra-icon': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      },
      '& .chakra-text': {
        lineHeight: 'normal',
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      },

      '&:focus': {
        transform: 'translateY(0)'
      },

      '&:hover': {
        transform: 'translateY(0)'
      },

      '&:active': {
        boxShadow: '0 0 transparent',
        transform: 'translateY(2px)'
      }
    },
    circle: {
      width: theme.fontSizes['6xl'],
      height: theme.fontSizes['6xl'],

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: `${color}.400`,
      borderRadius: 'full'
    },
    icon: {
      fontSize: `${theme.fontSizes['4xl']} !important`
    },
    disabled: {
      'cursor': 'not-allowed',

      'transform': 'translateY(2px) !important',

      '&:hover': {
        cursor: 'not-allowed',

        transform: 'translateY(2px) !important'
      },

      '&:active': {
        cursor: 'not-allowed',

        transform: 'translateY(2px) !important'
      }
    }
  },
  light: {
    button: {
      'color': 'gray.400',
      'borderColor': 'gray.400',
      'backgroundColor': 'transparent',
      'boxShadow': `0 2px ${theme.colors['gray'][400]}`,

      '&:focus': {
        boxShadow: `0 2px ${theme.colors['gray'][400]}`
      },

      '&:hover': {
        color: 'gray.600',
        borderColor: 'gray.600',
        backgroundColor: 'transparent',
        boxShadow: `0 2px ${theme.colors['gray'][600]}`
      },

      '&:active': {
        color: 'gray.600',
        borderColor: 'gray.600',
        backgroundColor: 'transparent'
      }
    },
    icon: {
      color: 'gray.50'
    },
    disabled: {
      'color': `${color}.400`,
      'borderColor': `${color}.400`,
      'backgroundColor': 'transparent',
      'boxShadow': 'none',

      '&:hover': {
        color: `${color}.400`,
        borderColor: `${color}.400`,
        backgroundColor: 'transparent',
        boxShadow: 'none'
      },

      '&:active': {
        color: `${color}.400`,
        borderColor: `${color}.400`,
        backgroundColor: 'transparent',
        boxShadow: 'none'
      }
    }
  },
  dark: {
    button: {
      'color': 'gray.500',
      'borderColor': 'gray.500',
      'backgroundColor': 'transparent',
      'boxShadow': `0 2px ${theme.colors['gray'][500]}`,

      '&:focus': {
        boxShadow: `0 2px ${theme.colors['gray'][500]}`
      },

      '&:hover': {
        color: 'gray.300',
        borderColor: 'gray.300',
        backgroundColor: 'transparent',
        boxShadow: `0 2px ${theme.colors['gray'][300]}`
      },

      '&:active': {
        color: 'gray.300',
        borderColor: 'gray.300',
        backgroundColor: 'transparent'
      }
    },
    icon: {
      color: 'gray.900'
    },
    disabled: {
      'color': `${color}.400`,
      'borderColor': `${color}.400`,
      'backgroundColor': 'transparent',
      'boxShadow': 'none',

      '&:hover': {
        color: `${color}.400`,
        borderColor: `${color}.400`,
        backgroundColor: 'transparent',
        boxShadow: 'none'
      },

      '&:active': {
        color: `${color}.400`,
        borderColor: `${color}.400`,
        backgroundColor: 'transparent',
        boxShadow: 'none'
      }
    }
  }
});
