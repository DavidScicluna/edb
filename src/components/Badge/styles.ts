import { Style } from '../../common/types';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
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
  isLight: BadgeProps['isLight'];
  variant: BadgeProps['variant'];
};

export default (
  theme: Theme,
  { color = 'gray', isLight = true, variant = 'contained' }: StyleBadgeProps
): BadgeStyle => ({
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
      lineHeight: 'normal',
      letterSpacing: '0.5px'
    },
    'xs': {
      height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 8}px`,
      fontSize: 'xs',

      borderRadius: 'sm',
      borderWidth: variant !== 'text' ? '1px' : '0',

      padding: `${theme.space[0.25]} ${theme.space[0.5]}`
    },
    'sm': {
      height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 8}px`,
      fontSize: 'sm',

      borderRadius: 'sm',
      borderWidth: variant !== 'text' ? '1px' : '0',

      padding: `${theme.space[0.25]} ${theme.space[0.5]}`
    },
    'md': {
      height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 8}px`,
      fontSize: 'md',

      borderRadius: 'sm',
      borderWidth: variant !== 'text' ? '2px' : '0',

      // padding: `${theme.space[0.25]} ${theme.space[0.5]}`
      padding: theme.space[0.25]
    },
    'lg': {
      height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.lg, 'rem')) + 8}px`,
      fontSize: 'lg',

      borderRadius: 'sm',
      borderWidth: variant !== 'text' ? '2px' : '0',

      // padding: `${theme.space[0.25]} ${theme.space[0.5]}`
      padding: theme.space[0.25]
    },
    'xl': {
      height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xl, 'rem')) + 8}px`,
      fontSize: 'xl',

      borderRadius: 'base',
      borderWidth: variant !== 'text' ? '2px' : '0',

      // padding: `${theme.space[0.5]} ${theme.space[1]}`
      padding: theme.space[0.5]
    },
    '2xl': {
      height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['2xl'], 'rem')) + 8}px`,
      fontSize: '2xl',

      borderRadius: 'base',
      borderWidth: variant !== 'text' ? '2px' : '0',

      // padding: `${theme.space[0.5]} ${theme.space[1]}`
      padding: theme.space[0.5]
    },
    '3xl': {
      height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['3xl'], 'rem')) + 8}px`,
      fontSize: '3xl',

      borderRadius: 'lg',
      borderWidth: variant !== 'text' ? '2px' : '0',

      // padding: `${theme.space[0.5]} ${theme.space[1]}`
      padding: theme.space[0.5]
    },
    '4xl': {
      height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['4xl'], 'rem')) + 8}px`,
      fontSize: '4xl',

      borderRadius: 'lg',
      borderWidth: variant !== 'text' ? '2px' : '0',

      // padding: `${theme.space[0.5]} ${theme.space[1]}`
      padding: theme.space[0.5]
    }
    // '5xl': {
    //   fontSize: '5xl',

    //   borderRadius: 'base',
    //   borderWidth: variant !== 'text' ? '2px' : '0',

    //   padding: `${theme.space[0.5]} ${theme.space[1]}`
    // },
    // '6xl': {
    //   fontSize: '6xl',

    //   borderRadius: 'md',
    //   borderWidth: variant !== 'text' ? '4px' : '0',

    //   padding: `${theme.space[0.75]} ${theme.space[1.5]}`
    // },
    // '7xl': {
    //   fontSize: '7xl',

    //   borderRadius: 'md',
    //   borderWidth: variant !== 'text' ? '4px' : '0',

    //   padding: `${theme.space[0.75]} ${theme.space[1.5]}`
    // },
    // '8xl': {
    //   fontSize: '8xl',

    //   borderRadius: 'lg',
    //   borderWidth: variant !== 'text' ? '6px' : '0',

    //   padding: `${theme.space[1]} ${theme.space[2]}`
    // },
    // '9xl': {
    //   fontSize: '9xl',

    //   borderRadius: 'lg',
    //   borderWidth: variant !== 'text' ? '6px' : '0',

    //   padding: `${theme.space[1]} ${theme.space[2]}`
    // }
  },
  light: {
    contained: {
      borderColor: `${color}.${isLight ? 400 : 600}`,
      backgroundColor: `${color}.${isLight ? 400 : 600}`,
      color: 'gray.50'
    },
    outlined: {
      borderColor: `${color}.${isLight ? 400 : 600}`,
      backgroundColor: 'gray.50',
      color: `${color}.${isLight ? 400 : 600}`
    },
    text: {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      color: `${color}.${isLight ? 400 : 600}`
    }
  },
  dark: {
    contained: {
      borderColor: `${color}.${isLight ? 500 : 300}`,
      backgroundColor: `${color}.${isLight ? 500 : 300}`,
      color: 'gray.900'
    },
    outlined: {
      borderColor: `${color}.${isLight ? 500 : 300}`,
      backgroundColor: 'gray.900',
      color: `${color}.${isLight ? 500 : 300}`
    },
    text: {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      color: `${color}.${isLight ? 500 : 300}`
    }
  }
});
