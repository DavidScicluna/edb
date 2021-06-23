import { Style } from '../../../../common/types/types';
import { Theme } from '../../../../theme/types';
import { Size } from './types';

type NavItemStyle = {
  common: Style;
  light: Style;
  dark: Style;
};

export default (theme: Theme, size: Size = 'md'): NavItemStyle => ({
  common: {
    minWidth: '46px',
    minHeight: '46px',

    alignSelf: 'flex-start',

    border: 'solid2',
    borderRadius: size === 'sm' || size === 'md' ? 'base' : 'lg',

    fontFamily: '"Pacifico", cursive',
    fontSize: size === 'sm' ? 'lg' : size === 'md' ? '4xl' : '6xl',
    fontWeight: 'bold',
    lineHeight: size === 'sm' ? '23px' : size === 'md' ? '45px' : '75px',

    textShadow: `${size === 'sm' ? '-1px -1px' : size === 'md' ? '-1.5px -1.5px' : '-2px -2px'} ${
      size === 'sm' ? '0.5px' : size === 'md' ? '1px' : '1.5px'
    } ${theme.colors.cyan[400]}, ${size === 'sm' ? '1px 1px' : size === 'md' ? '1.5px 1.5px' : '2px 2px'} ${
      size === 'sm' ? '0.5px' : size === 'md' ? '1px' : '1.5px'
    } ${theme.colors.red[400]}`,

    paddingTop: size === 'sm' ? 0.5 : 1,
    paddingBottom: size === 'sm' ? 0.5 : 1,
    paddingLeft: size === 'sm' ? 1 : 2,
    paddingRight: size === 'sm' ? 1 : 2,

    transition: `${theme.transition.duration.slower} ${theme.transition.easing['ease-in-out']}`
  },
  light: {
    backgroundColor: 'gray.700',
    borderColor: 'gray.700',
    color: 'white'
  },
  dark: {
    backgroundColor: 'gray.200',
    borderColor: 'gray.200',
    color: 'black'
  }
});
