import { Style } from '../../../../../../../../../common/types/types';
import { Theme } from '../../../../../../../../../theme/types';
import { LinkProps } from './types';

type LinkStyle = {
  common: {
    link: Style;
    icon: Style;
  };
  light: Style;
  dark: Style;
};

export default (theme: Theme, { color, isDisabled = false }: LinkProps): LinkStyle => ({
  common: {
    link: {
      'cursor': 'pointer',

      'width': 'auto',
      'height': 'auto',

      'minWidth': 'auto',
      'minHeight': 'auto',
      'maxWidth': 'none',
      'maxHeight': 'none',

      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',

      'padding': theme.space[1],

      'opacity': !isDisabled ? 1 : 0.5,

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

      '&:focus': {
        boxShadow: 'none'
      },

      '& svg': {
        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
      }
    },
    icon: {
      display: 'block',

      fontSize: `${theme.fontSizes['2xl']} !important`
    }
  },
  light: {
    'color': 'gray.50',

    '&:hover': {
      color
    }
  },
  dark: {
    'color': 'gray.900',

    '&:hover': {
      color
    }
  }
});
