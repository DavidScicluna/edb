import { Style } from '../../common/types';
import { Theme } from '../../theme/types';
import { CardProps } from './types';

type VariantStyle = {
  outlined: Style;
  transparent: Style;
};

type CardStyle = {
  card: VariantStyle;
  light: VariantStyle;
  dark: VariantStyle;
};

export default (theme: Theme, { color = 'gray', isFullWidth = false }: CardProps): CardStyle => ({
  card: {
    outlined: {
      width: isFullWidth ? '100%' : 'auto',
      height: 'auto',

      borderStyle: 'solid',
      borderWidth: '2px',
      borderRadius: 'lg',

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
    },
    transparent: {
      width: isFullWidth ? '100%' : 'auto',
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
