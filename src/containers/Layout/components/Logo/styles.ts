import { Size } from './types';

import { Style } from '../../../../common/types';
import { Theme as UserTheme } from '../../../../store/slices/User/types';
import { Theme } from '../../../../theme/types';

type NavItemStyle = {
  common: Style;
  light: Style;
  dark: Style;
};

export default (theme: Theme, color: UserTheme['color'], size: Size = 'md'): NavItemStyle => ({
  common: {
    cursor: 'pointer',

    width: size === 'sm' ? '40px' : '100px',
    minHeight: '40px',

    alignSelf: 'flex-start',

    border: 'solid2',
    borderRadius: size === 'sm' || size === 'md' ? 'base' : 'lg',

    fontFamily: '"Pacifico", cursive',
    fontSize: size === 'sm' ? 'lg' : size === 'md' ? '4xl' : '6xl',
    fontWeight: 400,
    lineHeight: size === 'sm' ? '20px' : size === 'md' ? '40px' : '75px',
    textTransform: 'lowercase',

    paddingTop: size === 'sm' ? 0.5 : 1,
    paddingBottom: size === 'sm' ? 0.5 : 1,
    paddingLeft: size === 'sm' ? 1 : 2,
    paddingRight: size === 'sm' ? 1 : 2,

    transition: [
      `width, ${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`,
      `padding, ${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`,
      `font-size, ${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`,
      `background-color ${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,
      `border-color ${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,
      `color ${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
    ]
      .filter((style) => style)
      .join(', ')
  },
  light: {
    'backgroundColor': `${color}.400`,
    'borderColor': `${color}.400`,
    'color': 'gray.50',

    '&:hover': {
      backgroundColor: `${color}.500`,
      borderColor: `${color}.500`,
      color: 'gray.50'
    }
  },
  dark: {
    'backgroundColor': `${color}.500`,
    'borderColor': `${color}.500`,
    'color': 'gray.900',

    '&:hover': {
      backgroundColor: `${color}.400`,
      borderColor: `${color}.400`,
      color: 'gray.900'
    }
  }
});
