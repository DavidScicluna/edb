import { Style } from '../../common/types';
import { Theme } from '../../theme/types';
import { BadgeProps, Variant, Size } from './types';

type VariantStyle = { [key in Variant]: Style };

type SizeStyle = { [key in Size]: Style };

type DefaultStyle = { default: Style };

type BadgeStyle = {
  badge: DefaultStyle & SizeStyle;
  light: VariantStyle;
  dark: VariantStyle;
};

type StyleBadgeProps = {
  color: BadgeProps['color'];
  variant: BadgeProps['variant'];
};

export default (theme: Theme, { color = 'gray', variant = 'contained' }: StyleBadgeProps): BadgeStyle => ({
  badge: {
    'default': {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',

      borderStyle: 'solid',
      outline: 'none',

      fontWeight: 'semibold',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      lineHeight: 'normal'
    },
    'xs': {
      fontSize: 'xs',

      borderRadius: 'xs',
      borderWidth: variant !== 'text' ? '1px' : '0',

      padding: `${theme.space[0.25]} ${theme.space[0.5]}`
    },
    'sm': {
      fontSize: 'sm',

      borderRadius: 'xs',
      borderWidth: variant !== 'text' ? '1px' : '0',

      padding: `${theme.space[0.25]} ${theme.space[0.5]}`
    },
    'md': {
      fontSize: 'md',

      borderRadius: 'sm',
      borderWidth: variant !== 'text' ? '2px' : '0',

      padding: `${theme.space[0.5]} ${theme.space[1]}`
    },
    'lg': {
      fontSize: 'lg',

      borderRadius: 'base',
      borderWidth: variant !== 'text' ? '2px' : '0',

      padding: `${theme.space[0.5]} ${theme.space[1]}`
    },
    'xl': {
      fontSize: 'xl',

      borderRadius: 'base',
      borderWidth: variant !== 'text' ? '2px' : '0',

      padding: `${theme.space[0.5]} ${theme.space[1]}`
    },
    '2xl': {
      fontSize: '2xl',

      borderRadius: 'base',
      borderWidth: variant !== 'text' ? '2px' : '0',

      padding: `${theme.space[0.5]} ${theme.space[1]}`
    },
    '3xl': {
      fontSize: '3xl',

      borderRadius: 'base',
      borderWidth: variant !== 'text' ? '2px' : '0',

      padding: `${theme.space[0.5]} ${theme.space[1]}`
    },
    '4xl': {
      fontSize: '4xl',

      borderRadius: 'base',
      borderWidth: variant !== 'text' ? '2px' : '0',

      padding: `${theme.space[0.5]} ${theme.space[1]}`
    },
    '5xl': {
      fontSize: '5xl',

      borderRadius: 'base',
      borderWidth: variant !== 'text' ? '2px' : '0',

      padding: `${theme.space[0.5]} ${theme.space[1]}`
    },
    '6xl': {
      fontSize: '6xl',

      borderRadius: 'md',
      borderWidth: variant !== 'text' ? '4px' : '0',

      padding: `${theme.space[0.75]} ${theme.space[1.5]}`
    },
    '7xl': {
      fontSize: '7xl',

      borderRadius: 'md',
      borderWidth: variant !== 'text' ? '4px' : '0',

      padding: `${theme.space[0.75]} ${theme.space[1.5]}`
    },
    '8xl': {
      fontSize: '8xl',

      borderRadius: 'lg',
      borderWidth: variant !== 'text' ? '6px' : '0',

      padding: `${theme.space[1]} ${theme.space[2]}`
    },
    '9xl': {
      fontSize: '9xl',

      borderRadius: 'lg',
      borderWidth: variant !== 'text' ? '6px' : '0',

      padding: `${theme.space[1]} ${theme.space[2]}`
    }
  },
  light: {
    contained: {
      borderColor: `${color}.500`,
      backgroundColor: `${color}.500`,
      color: 'gray.50'
    },
    outlined: {
      borderColor: `${color}.500`,
      backgroundColor: 'gray.50',
      color: `${color}.500`
    },
    text: {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      color: `${color}.500`
    }
  },
  dark: {
    contained: {
      borderColor: `${color}.400`,
      backgroundColor: `${color}.400`,
      color: 'gray.900'
    },
    outlined: {
      borderColor: `${color}.400`,
      backgroundColor: 'gray.900',
      color: `${color}.400`
    },
    text: {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      color: `${color}.400`
    }
  }
});
