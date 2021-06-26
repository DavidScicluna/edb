import { Style } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import { IconButtonProps } from './types';

type IconButtonStyle = {
  common: {
    button: Style;
    disabled: Style;
  };
  light: {
    button: Style;
    disabled: Style;
  };
  dark: {
    button: Style;
    disabled: Style;
  };
};

export default (
  theme: Theme,
  { color = 'gray', size = 'md', variant = 'contained', isLoading = false }: IconButtonProps
): IconButtonStyle => ({
  common: {
    button: {
      'cursor': 'pointer',
      'touchAction': 'manipulation',
      'userSelect': 'none',

      'width': 'auto',
      'height': 'auto',

      'opacity': 1,

      'borderStyle': 'solid',
      'borderWidth': variant === 'outlined' ? (size === 'xs' ? '1px' : '2px') : size === 'xs' ? '0.5px' : '1px',
      'borderRadius': size === 'lg' || size === 'md' ? 'md' : size === 'xs' ? 'sm' : 'base',

      'transform': 'translateY(0)',

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '&:focus': {
        transform: 'translateY(0)'
      },

      '&:hover': {
        transform: 'translateY(0)'
      },

      '&:active': {
        boxShadow: '0 0 transparent',
        transform: variant !== 'icon' ? `translateY(${variant === 'contained' ? '3px' : '2px'})` : 'none'
      }
    },
    disabled: {
      'cursor': 'not-allowed',
      'opacity': isLoading ? 1 : 0.5,

      'transform':
        variant !== 'icon'
          ? `translateY(${variant === 'contained' ? '3px' : '2px'}) !important`
          : 'translateY(0) !important',

      '&:hover': {
        cursor: 'not-allowed',
        opacity: isLoading ? 1 : 0.5,

        transform:
          variant !== 'icon'
            ? `translateY(${variant === 'contained' ? '3px' : '2px'}) !important`
            : 'translateY(0) !important'
      },

      '&:active': {
        cursor: 'not-allowed',
        opacity: isLoading ? 1 : 0.5,

        transform:
          variant !== 'icon'
            ? `translateY(${variant === 'contained' ? '3px' : '2px'}) !important`
            : 'translateY(0) !important'
      }
    }
  },
  light: {
    button: {
      'color': variant === 'contained' ? 'gray.50' : `${color}.400`,
      'borderColor': variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
      'backgroundColor': variant === 'contained' ? `${color}.400` : 'transparent',
      'boxShadow':
        variant !== 'icon'
          ? `0 ${variant === 'contained' ? '3px' : '2px'} ${theme.colors[color][variant === 'contained' ? 600 : 400]}`
          : 'none',

      '&:focus': {
        boxShadow:
          variant !== 'icon'
            ? `0 ${variant === 'contained' ? '3px' : '2px'} ${theme.colors[color][variant === 'contained' ? 600 : 400]}`
            : 'none'
      },

      '&:hover': {
        color: variant === 'contained' ? 'gray.50' : `${color}.600`,
        borderColor: variant === 'contained' ? `${color}.500` : variant === 'outlined' ? `${color}.600` : 'transparent',
        backgroundColor: variant === 'contained' ? `${color}.500` : 'transparent',
        boxShadow:
          variant !== 'icon' ? `0 ${variant === 'contained' ? '3px' : '2px'} ${theme.colors[color][600]}` : 'none'
      },

      '&:active': {
        color: variant === 'contained' ? 'gray.50' : `${color}.600`,
        borderColor: variant === 'contained' ? `${color}.500` : variant === 'outlined' ? `${color}.600` : 'transparent',
        backgroundColor: variant === 'contained' ? `${color}.500` : 'transparent'
      }
    },
    disabled: {
      'color': variant === 'contained' ? 'gray.50' : `${color}.400`,
      'borderColor': variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
      'backgroundColor': variant === 'contained' ? `${color}.400` : 'transparent',
      'boxShadow': 'none',

      '&:hover': {
        color: variant === 'contained' ? 'gray.50' : `${color}.400`,
        borderColor: variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
        backgroundColor: variant === 'contained' ? `${theme.colors[color][400]} !important` : 'transparent',
        boxShadow: 'none'
      },

      '&:active': {
        color: variant === 'contained' ? 'gray.50' : `${color}.400`,
        borderColor: variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
        backgroundColor: variant === 'contained' ? `${theme.colors[color][400]} !important` : 'transparent',
        boxShadow: 'none'
      }
    }
  },
  dark: {
    button: {
      'color': variant === 'contained' ? 'gray.900' : `${color}.400`,
      'borderColor': variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
      'backgroundColor': variant === 'contained' ? `${color}.400` : 'transparent',
      'boxShadow':
        variant !== 'icon'
          ? `0 ${variant === 'contained' ? '3px' : '2px'} ${theme.colors[color][variant === 'contained' ? 200 : 400]}`
          : 'none',

      '&:focus': {
        boxShadow:
          variant !== 'icon'
            ? `0 ${variant === 'contained' ? '3px' : '2px'} ${theme.colors[color][variant === 'contained' ? 200 : 400]}`
            : 'none'
      },

      '&:hover': {
        color: variant === 'contained' ? 'gray.900' : `${color}.200`,
        borderColor: variant === 'contained' ? `${color}.300` : variant === 'outlined' ? `${color}.200` : 'transparent',
        backgroundColor: variant === 'contained' ? `${color}.300` : 'transparent',
        boxShadow:
          variant !== 'icon' ? `0 ${variant === 'contained' ? '3px' : '2px'} ${theme.colors[color][200]}` : 'none'
      },

      '&:active': {
        color: variant === 'contained' ? 'gray.900' : `${color}.200`,
        borderColor: variant === 'contained' ? `${color}.300` : variant === 'outlined' ? `${color}.200` : 'transparent',
        backgroundColor: variant === 'contained' ? `${color}.300` : 'transparent'
      }
    },
    disabled: {
      'color': variant === 'contained' ? 'gray.900' : `${color}.400`,
      'borderColor': variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
      'backgroundColor': variant === 'contained' ? `${color}.400` : 'transparent',
      'boxShadow': 'none',

      '&:hover': {
        color: variant === 'contained' ? 'gray.900' : `${color}.400`,
        borderColor: variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
        backgroundColor: variant === 'contained' ? `${theme.colors[color][400]} !important` : 'transparent',
        boxShadow: 'none'
      },

      '&:active': {
        color: variant === 'contained' ? 'gray.900' : `${color}.400`,
        borderColor: variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
        backgroundColor: variant === 'contained' ? `${theme.colors[color][400]} !important` : 'transparent',
        boxShadow: 'none'
      }
    }
  }
});
