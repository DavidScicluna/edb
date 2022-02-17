import { ArrowProps } from './types';

import { Style } from '../../../../common/types';
import { Theme } from '../../../../theme/types';

type DirectionStyle = {
  left: Style;
  right: Style;
};

type ArrowStyle = {
  arrow: Style;
  light: DirectionStyle;
  dark: DirectionStyle;
};

type StyleArrowProps = {
  isDisabled: ArrowProps['isDisabled'];
};

export default (theme: Theme, { isDisabled = false }: StyleArrowProps): ArrowStyle => ({
  arrow: {
    content: '""',

    display: 'block',

    pointerEvents: 'none',

    transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
  },
  light: {
    left: {
      background: !isDisabled
        ? `linear-gradient(to right, ${theme.colors.gray[50]} 50%, rgba(0, 0, 0, 0) 50%)`
        : 'transparent'
    },
    right: {
      background: !isDisabled
        ? `linear-gradient(to left, ${theme.colors.gray[50]} 50%, rgba(0, 0, 0, 0) 50%)`
        : 'transparent'
    }
  },
  dark: {
    left: {
      background: !isDisabled
        ? `linear-gradient(to right, ${theme.colors.gray[900]} 50%, rgba(0, 0, 0, 0) 50%)`
        : 'transparent'
    },
    right: {
      background: !isDisabled
        ? `linear-gradient(to left, ${theme.colors.gray[900]} 50%, rgba(0, 0, 0, 0) 50%)`
        : 'transparent'
    }
  }
});
