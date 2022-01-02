import { Style } from '../../../../../../../../common/types';
import { Theme } from '../../../../../../../../theme/types';
import { LinkProps } from './types';

type LinkStyle = {
  common: {
    link: Style;
    icon: Style;
  };
};

type StyleLinkProps = {
  defaultColor: LinkProps['defaultColor'];
  color: LinkProps['color'];
};

export default (theme: Theme, { defaultColor, color }: StyleLinkProps): LinkStyle => ({
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

      'color': defaultColor,

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
