import { Style } from '../../../../common/types/types';
import { Theme as UserTheme } from '../../../../store/slices/User/types';
import { Theme } from '../../../../theme/types';
import { Size } from './types';

type NavItemStyle = {
  common: Style;
  light: Style;
  dark: Style;
};

export default (theme: Theme, color: UserTheme['color'], size: Size = 'md'): NavItemStyle => ({
  common: {
    minWidth: '46px',
    minHeight: '46px',

    alignSelf: 'flex-start',

    border: 'solid2',
    borderRadius: size === 'sm' || size === 'md' ? 'base' : 'lg',
    backgroundColor: `${color}.400`,
    borderColor: `${color}.400`,

    fontFamily: '"Pacifico", cursive',
    fontSize: size === 'sm' ? 'lg' : size === 'md' ? '4xl' : '6xl',
    fontWeight: 'bold',
    lineHeight: size === 'sm' ? '23px' : size === 'md' ? '45px' : '75px',

    paddingTop: size === 'sm' ? 0.5 : 1,
    paddingBottom: size === 'sm' ? 0.5 : 1,
    paddingLeft: size === 'sm' ? 1 : 2,
    paddingRight: size === 'sm' ? 1 : 2,

    transition: `${theme.transition.duration.slower} ${theme.transition.easing['ease-in-out']}`
  },
  light: {
    color: 'gray.50'
  },
  dark: {
    color: 'gray.900'
  }
});
