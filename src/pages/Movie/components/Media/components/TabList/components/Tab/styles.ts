import { Style } from '../../../../../../../../common/types/types';
import { Theme } from '../../../../../../../../theme/types';

type ColorModeStyle = {
  tab: Style;
  disabled: Style;
};

type TabStyle = {
  tab: Style;
  light: ColorModeStyle;
  dark: ColorModeStyle;
};

export default (theme: Theme, isActive = false): TabStyle => ({
  tab: {
    'cursor': 'pointer',

    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',

    'border': 'none',
    'borderRadius': 'base',

    'fontWeight': 'semibold',
    'fontSize': 'md',
    'textTransform': 'uppercase',
    'whiteSpace': 'nowrap',
    'lineHeight': 'normal',

    'padding': `${theme.space[1]} ${theme.space[2]}`,

    'opacity': 1,

    'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

    '&:focus': {
      boxShadow: 'none'
    }
  },
  light: {
    tab: {
      'backgroundColor': isActive ? 'gray.400' : 'transparent',
      'color': isActive ? 'gray.50' : 'gray.400',

      '&:hover': {
        backgroundColor: isActive ? 'gray.400' : 'transparent',
        color: isActive ? 'gray.50' : 'gray.500'
      },

      '&:active': {
        backgroundColor: isActive ? 'gray.400' : 'transparent',
        color: isActive ? 'gray.50' : 'gray.500'
      }
    },
    disabled: {
      'backgroundColor': 'transparent',
      'color': 'gray.400',

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        backgroundColor: 'transparent',
        color: 'gray.500'
      },

      '&:hover': {
        backgroundColor: 'transparent',
        color: 'gray.500'
      },

      '&:active': {
        backgroundColor: 'transparent',
        color: 'gray.500'
      }
    }
  },
  dark: {
    tab: {
      'backgroundColor': isActive ? 'gray.500' : 'transparent',
      'color': isActive ? 'gray.50' : 'gray.500',

      '&:hover': {
        backgroundColor: isActive ? 'gray.500' : 'transparent',
        color: isActive ? 'gray.50' : 'gray.400'
      },

      '&:active': {
        backgroundColor: isActive ? 'gray.500' : 'transparent',
        color: isActive ? 'gray.50' : 'gray.400'
      }
    },
    disabled: {
      'backgroundColor': 'transparent',
      'color': 'gray.500',

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        backgroundColor: 'transparent',
        color: 'gray.400'
      },

      '&:hover': {
        backgroundColor: 'transparent',
        color: 'gray.400'
      },

      '&:active': {
        backgroundColor: 'transparent',
        color: 'gray.400'
      }
    }
  }
});
