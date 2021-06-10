import { Style } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import { ButtonProps } from './types';

type ButtonStyle = {
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
  { color = 'gray', size = 'md', variant = 'contained', isFullWidth = false, isLoading = false }: ButtonProps
): ButtonStyle => ({
  common: {
    button: {
      'width': isFullWidth ? '100%' : 'auto',
      'minWidth': isFullWidth ? '100%' : 'auto',
      'height': 'auto',

      'opacity': 1,

      'fontWeight': 'semibold',
      'fontSize': size === 'xs' ? 'xs' : size === 'sm' || size === 'md' ? 'sm' : 'md',
      'textTransform': 'uppercase',

      'borderStyle': 'solid',
      'borderWidth': size === 'xs' ? '1px' : '2px',
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

        transform: `translateY(${
          variant === 'contained'
            ? size === 'xs'
              ? '3px'
              : size === 'sm'
              ? '4px'
              : '6px'
            : variant === 'outlined'
            ? size === 'xs'
              ? '3px'
              : '4px'
            : '0'
        })`
      }
    },
    disabled: {
      'cursor': 'not-allowed',
      'opacity': isLoading ? 1 : 0.5,

      'transform': 'translateY(0) !important',

      '&:hover': {
        cursor: 'not-allowed',
        opacity: isLoading ? 1 : 0.5,

        transform: 'translateY(0) !important'
      },

      '&:active': {
        cursor: 'not-allowed',
        opacity: isLoading ? 1 : 0.5,

        transform: 'translateY(0) !important'
      }
    }
  },
  light: {
    button: {
      'color': variant === 'contained' ? 'gray.50' : `${color}.400`,
      'borderColor': variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
      'backgroundColor': variant === 'contained' ? `${color}.400` : 'transparent',
      'boxShadow':
        variant === 'contained'
          ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][600]}`
          : variant === 'outlined'
          ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
          : 'none',

      '&:focus': {
        boxShadow:
          variant === 'contained'
            ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][600]}`
            : variant === 'outlined'
            ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
            : 'none'
      },

      '&:hover': {
        color: variant === 'contained' ? 'gray.50' : `${color}.600`,
        borderColor: variant === 'contained' ? `${color}.500` : variant === 'outlined' ? `${color}.600` : 'transparent',
        backgroundColor: variant === 'contained' ? `${color}.500` : 'transparent',

        boxShadow:
          variant === 'contained'
            ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][600]}`
            : variant === 'outlined'
            ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][600]}`
            : 'none'
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
      'boxShadow':
        variant === 'contained'
          ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][600]}`
          : variant === 'outlined'
          ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
          : 'none',

      '&:hover': {
        color: variant === 'contained' ? 'gray.50' : `${color}.400`,
        borderColor: variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
        backgroundColor: variant === 'contained' ? `${theme.colors[color][400]} !important` : 'transparent',
        boxShadow:
          variant === 'contained'
            ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][600]}`
            : variant === 'outlined'
            ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
            : 'none'
      },

      '&:active': {
        color: variant === 'contained' ? 'gray.50' : `${color}.400`,
        borderColor: variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
        backgroundColor: variant === 'contained' ? `${theme.colors[color][400]} !important` : 'transparent',
        boxShadow:
          variant === 'contained'
            ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][600]}`
            : variant === 'outlined'
            ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
            : 'none'
      }
    }
  },
  dark: {
    button: {
      'color': variant === 'contained' ? 'gray.900' : `${color}.400`,
      'borderColor': variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
      'backgroundColor': variant === 'contained' ? `${color}.400` : 'transparent',
      'boxShadow':
        variant === 'contained'
          ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][200]}`
          : variant === 'outlined'
          ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
          : 'none',

      '&:focus': {
        boxShadow:
          variant === 'contained'
            ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][200]}`
            : variant === 'outlined'
            ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
            : 'none'
      },

      '&:hover': {
        color: variant === 'contained' ? 'gray.900' : `${color}.200`,
        borderColor: variant === 'contained' ? `${color}.300` : variant === 'outlined' ? `${color}.200` : 'transparent',
        backgroundColor: variant === 'contained' ? `${color}.300` : 'transparent',

        boxShadow:
          variant === 'contained'
            ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][200]}`
            : variant === 'outlined'
            ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][200]}`
            : 'none'
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
      'boxShadow':
        variant === 'contained'
          ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][200]}`
          : variant === 'outlined'
          ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
          : 'none',

      '&:hover': {
        color: variant === 'contained' ? 'gray.900' : `${color}.400`,
        borderColor: variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
        backgroundColor: variant === 'contained' ? `${theme.colors[color][400]} !important` : 'transparent',
        boxShadow:
          variant === 'contained'
            ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][200]}`
            : variant === 'outlined'
            ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
            : 'none'
      },

      '&:active': {
        color: variant === 'contained' ? 'gray.900' : `${color}.400`,
        borderColor: variant === 'contained' || variant === 'outlined' ? `${color}.400` : 'transparent',
        backgroundColor: variant === 'contained' ? `${theme.colors[color][400]} !important` : 'transparent',
        boxShadow:
          variant === 'contained'
            ? `0 ${size === 'xs' ? '4px' : '6px'} ${theme.colors[color][200]}`
            : variant === 'outlined'
            ? `0 ${size === 'xs' ? '3px' : '4px'} ${theme.colors[color][400]}`
            : 'none'
      }
    }
  }
});
