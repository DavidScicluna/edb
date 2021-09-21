import { Style } from '../../../../../../../../../../common/types/types';
import { Theme as UserTheme } from '../../../../../../../../../../store/slices/User/types';
import { Theme } from '../../../../../../../../../../theme/types';

export type TabStyle = {
  tab: Style;
  disabled: Style;
  light: Style;
  dark: Style;
};

export default (theme: Theme, color: UserTheme['color'], isSelected = false): TabStyle => ({
  tab: {
    'fontSize': 'sm',
    'fontWeight': 'semibold',
    'textTransform': 'uppercase',
    'whiteSpace': 'nowrap',

    'borderRadius': 'base',

    'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

    '&:hover': {
      textDecoration: 'none'
    },

    '&:focus': {
      boxShadow: 'none'
    }
  },
  disabled: {
    cursor: 'not-allowed',

    opacity: 0.5
  },
  light: {
    'color': isSelected ? 'gray.50' : 'gray.400',
    'backgroundColor': isSelected ? `${color}.400` : 'transparent',

    '&:hover': {
      color: isSelected ? 'gray.50' : 'gray.500',
      backgroundColor: isSelected ? `${color}.500` : 'transparent'
    }
  },
  dark: {
    'color': isSelected ? 'gray.900' : 'gray.500',
    'backgroundColor': isSelected ? `${color}.500` : 'transparent',

    '&:hover': {
      color: isSelected ? 'gray.900' : 'gray.400',
      backgroundColor: isSelected ? `${color}.400` : 'transparent'
    }
  }
});
