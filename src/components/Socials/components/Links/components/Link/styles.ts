import { ColorMode } from '@chakra-ui/react';

import { LinkProps } from './types';

import { Style } from '../../../../../../common/types';
import { Theme } from '../../../../../../theme/types';

type LinkStyle = {
  common: {
    link: Style;
    icon: Style;
  };
};

type StyleLinkProps = {
  colorMode: ColorMode;
  color: LinkProps['color'];
};

export default (theme: Theme, { colorMode, color }: StyleLinkProps): LinkStyle => ({
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

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

      'color': colorMode === 'light' ? 'gray.400' : 'gray.400',

      '&:hover': {
        color
      },

      '&:focus': {
        boxShadow: 'none'
      },

      '& svg': {
        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
      }
    },
    icon: {
      'width': theme.fontSizes['2xl'],
      'height': theme.fontSizes['2xl'],

      '& svg': {
        display: 'block',

        fontSize: theme.fontSizes['2xl']
      }
    }
  }
});
