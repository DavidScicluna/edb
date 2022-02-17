import { EmptyProps, Variant } from './types';

import { Style } from '../../common/types';
import { Theme } from '../../theme/types';

type VariantStyle = { [key in Variant]: Style };

type EmptyStyle = {
  empty: VariantStyle;
  light: VariantStyle;
  dark: VariantStyle;
};

type StyleEmptyProps = {
  color: EmptyProps['color'];
};

export default (theme: Theme, { color = 'gray' }: StyleEmptyProps): EmptyStyle => ({
  empty: {
    outlined: {
      width: '100%',
      height: 'auto',

      borderStyle: 'dashed',
      borderWidth: '2px',
      borderRadius: 'lg',

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
    },
    transparent: {
      width: '100%',
      height: 'auto',

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
    }
  },
  light: {
    outlined: {
      'backgroundColor': 'transparent',
      'borderColor': color === 'gray' ? 'gray.200' : `${color}.400`,

      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: color === 'gray' ? 'gray.200' : `${color}.400`
      },

      '&:active': {
        backgroundColor: 'transparent',
        borderColor: color === 'gray' ? 'gray.200' : `${color}.400`
      }
    },
    transparent: {
      'backgroundColor': 'transparent',

      '&:hover': {
        backgroundColor: 'transparent'
      },

      '&:active': {
        backgroundColor: 'transparent'
      }
    }
  },
  dark: {
    outlined: {
      'backgroundColor': 'transparent',
      'borderColor': color === 'gray' ? 'gray.700' : `${color}.500`,

      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: color === 'gray' ? 'gray.700' : `${color}.500`
      },

      '&:active': {
        backgroundColor: 'transparent',
        borderColor: color === 'gray' ? 'gray.700' : `${color}.500`
      }
    },
    transparent: {
      'backgroundColor': 'transparent',

      '&:hover': {
        backgroundColor: 'transparent'
      },

      '&:active': {
        backgroundColor: 'transparent'
      }
    }
  }
});
