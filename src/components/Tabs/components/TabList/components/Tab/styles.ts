import { Style } from '../../../../../../common/types';
import { Theme, Color } from '../../../../../../theme/types';
import { TabsProps, Size } from './types';

type SizeStyle = { [key in Size]: Style };

type DefaultStyle = { default: Style };

export type TabStyle = {
  tab: DefaultStyle & SizeStyle;
  disabled: Style;
  light: Style;
  dark: Style;
};

type StyleTabsProps = {
  color: keyof Color;
  isFullWidth: TabsProps['isFullWidth'];
  isSelected: TabsProps['isSelected'];
};

export default (
  theme: Theme,
  { color = 'gray', isFullWidth = false, isSelected = false }: StyleTabsProps
): TabStyle => ({
  tab: {
    default: {
      'cursor': 'pointer',

      'width': isFullWidth ? '100%' : 'auto',
      'height': 'auto',

      'minWidth': 'auto',
      'minHeight': 'auto',
      'maxWidth': 'none',
      'maxHeight': 'none',

      'userSelect': 'none',

      'display': 'flex',
      'flexWrap': 'nowrap',
      'alignItems': 'center',
      'justifyContent': 'center',

      'fontWeight': 'semibold',
      'textTransform': 'uppercase',
      'whiteSpace': 'nowrap',
      'lineHeight': 'normal',

      'opacity': 1,

      'borderStyle': 'solid',
      'outline': 'none',
      'outlineWidth': '0px',
      'outlineStyle': 'dashed',

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

      '&:focus': {
        boxShadow: 'none'
      },

      '& svg': {
        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
      }
    },
    sm: {
      'fontSize': 'xs',

      'borderRadius': 'sm',
      'borderWidth': '1px',

      'padding': `${theme.space[0.5]} ${theme.space[1]}`,

      '&:focus': {
        outlineOffset: '4px'
      }
    },
    md: {
      'fontSize': 'sm',

      'borderRadius': 'base',
      'borderWidth': '2px',

      'padding': `${theme.space[1]} ${theme.space[2]}`,

      '&:focus': {
        outlineOffset: '5px'
      }
    },
    lg: {
      'fontSize': 'md',

      'borderRadius': 'lg',
      'borderWidth': '2px',

      'padding': `${theme.space[1.5]} ${theme.space[3]}`,

      '&:focus': {
        outlineOffset: '6px'
      }
    }
  },
  disabled: {
    cursor: 'not-allowed',

    opacity: 0.5
  },
  light: {
    'color': isSelected ? 'gray.50' : 'gray.400',
    'borderColor': isSelected ? `${color}.400` : 'transparent',
    'backgroundColor': isSelected ? `${color}.400` : 'transparent',

    '& svg': {
      color: isSelected ? 'gray.50' : 'gray.400'
    },

    '&:hover': {
      'color': isSelected ? 'gray.50' : 'gray.500',
      'borderColor': isSelected ? `${color}.500` : 'transparent',
      'backgroundColor': isSelected ? `${color}.500` : 'transparent',

      '& svg': {
        color: isSelected ? 'gray.50' : 'gray.500'
      }
    }
  },
  dark: {
    'color': isSelected ? 'gray.900' : 'gray.500',
    'borderColor': isSelected ? `${color}.500` : 'transparent',
    'backgroundColor': isSelected ? `${color}.500` : 'transparent',

    '& svg': {
      color: isSelected ? 'gray.900' : 'gray.500'
    },

    '&:hover': {
      'color': isSelected ? 'gray.900' : 'gray.400',
      'borderColor': isSelected ? `${color}.400` : 'transparent',
      'backgroundColor': isSelected ? `${color}.400` : 'transparent',

      '& svg': {
        color: isSelected ? 'gray.900' : 'gray.400'
      }
    }
  }
});
