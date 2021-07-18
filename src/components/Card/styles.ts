import { Style } from '../../common/types/types';
import { Theme } from '../../theme/types';
import { CardProps } from './types';

type VariantStyle = {
  outlined: Style;
  transparent: Style;
};

type CardStyle = {
  card: Style;
  light: VariantStyle;
  dark: VariantStyle;
};

export default (theme: Theme, { color = 'gray', isFullWidth = false }: CardProps): CardStyle => ({
  card: {
    width: isFullWidth ? '100%' : 'auto',
    height: 'auto',

    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',

    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: 'lg',

    transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
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
      'borderColor': 'transparent',

      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
      },

      '&:active': {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
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
      'borderColor': 'transparent',

      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
      },

      '&:active': {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
      }
    }
  }
});
