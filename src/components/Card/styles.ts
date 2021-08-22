import { Style } from '../../common/types/types';
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

export default (color: CardProps['color'] = 'gray', isFullWidth = false): CardStyle => ({
  card: {
    width: isFullWidth ? '100%' : 'auto',
    height: 'auto',

    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: 'lg',

    transition: 'none'
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
