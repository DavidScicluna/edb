import { Style } from '../../../../../../common/types';
import { Theme } from '../../../../../../theme/types';
import { SocialProps } from './types';

type LinkStyle = {
  common: {
    link: Style;
    icon: Style;
  };
};

type StyleSocialProps = {
  defaultColor: SocialProps['defaultColor'];
  color: SocialProps['color'];
  isDisabled: SocialProps['isDisabled'];
};

export default (theme: Theme, { defaultColor, color, isDisabled = false }: StyleSocialProps): LinkStyle => ({
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
      '& svg': {
        display: 'block',

        width: theme.fontSizes['2xl'],
        height: theme.fontSizes['2xl'],
        fontSize: theme.fontSizes['2xl']
      }
    }
  }
});
