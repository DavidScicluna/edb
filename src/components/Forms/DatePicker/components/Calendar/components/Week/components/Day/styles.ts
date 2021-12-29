import { Style } from '../../../../../../../../../common/types';
import { Theme } from '../../../../../../../../../theme/types';
import { DayProps, Variant } from './types';

type VariantStyle = { [key in Variant]: Style };

type DisabledStyle<S> = { disabled: S };

type DefaultStyle = { default: Style };

type DayStyle = {
  day: DefaultStyle & DisabledStyle<Style>;
  light: VariantStyle & DisabledStyle<VariantStyle>;
  dark: VariantStyle & DisabledStyle<VariantStyle>;
};

type StyleDayProps = {
  color: DayProps['color'];
};

export default (theme: Theme, { color = 'gray' }: StyleDayProps): DayStyle => ({
  day: {
    default: {
      'cursor': 'pointer',

      'width': '100%',
      'height': 'auto',

      'minWidth': 'auto',
      'minHeight': 'auto',
      'maxWidth': 'none',
      'maxHeight': 'none',

      'userSelect': 'none',

      'opacity': 1,

      'display': 'flex',
      'flexWrap': 'nowrap',
      'alignItems': 'center',
      'justifyContent': 'center',

      'fontWeight': 'semibold',
      'textTransform': 'uppercase',
      'whiteSpace': 'nowrap',
      'lineHeight': 'normal',

      'borderStyle': 'solid',
      'borderRadius': 'base',
      'borderWidth': '2px',

      'outline': 'none',
      'outlineWidth': '0px',
      'outlineStyle': 'dashed',

      'fontSize': 'sm',

      'padding': `${theme.space[1]} ${theme.space[2]}`,

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

      '&:focus': {
        boxShadow: 'none'
      }
    },
    disabled: {
      cursor: 'default',

      opacity: 0.5
    }
  },
  light: {
    contained: {
      'borderColor': `${color}.400`,
      'backgroundColor': `${color}.400`,
      'color': 'gray.50',

      '&:hover': {
        borderColor: `${color}.500`,
        backgroundColor: `${color}.500`,
        color: 'gray.50'
      },

      '&:active': {
        borderColor: `${color}.600`,
        backgroundColor: `${color}.600`,
        color: 'gray.50'
      }
    },
    text: {
      'borderColor': 'transparent',
      'backgroundColor': 'transparent',
      'color': `${color}.400`,

      '&:hover': {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.500`
      },

      '&:active': {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.600`
      }
    },
    disabled: {
      contained: {
        borderColor: `${theme.colors.gray[400]} !important`,
        backgroundColor: `${theme.colors.gray[400]} !important`,
        color: `${theme.colors.gray[50]} !important`
      },
      text: {
        borderColor: 'transparent !important',
        backgroundColor: 'transparent !important',
        color: `${theme.colors.gray[50]} !important`
      }
    }
  },
  dark: {
    contained: {
      'borderColor': `${color}.500`,
      'backgroundColor': `${color}.500`,
      'color': 'gray.900',

      '&:hover': {
        borderColor: `${color}.400`,
        backgroundColor: `${color}.400`,
        color: 'gray.900'
      },

      '&:active': {
        borderColor: `${color}.300`,
        backgroundColor: `${color}.300`,
        color: 'gray.900'
      }
    },
    text: {
      'borderColor': 'transparent',
      'backgroundColor': 'transparent',
      'color': `${color}.500`,

      '&:hover': {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.400`
      },

      '&:active': {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.300`
      }
    },
    disabled: {
      contained: {
        borderColor: `${theme.colors.gray[500]} !important`,
        backgroundColor: `${theme.colors.gray[500]} !important`,
        color: `${theme.colors.gray[900]} !important`
      },
      text: {
        borderColor: 'transparent !important',
        backgroundColor: 'transparent !important',
        color: `${theme.colors.gray[900]} !important`
      }
    }
  }
});
