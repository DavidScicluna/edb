import { Style } from '../../../../common/types';
import { Theme } from '../../../../theme/types';
import { ArrowProps } from './types';

type DirectionStyle = {
  left: Style;
  right: Style;
};

type ArrowStyle = {
  arrow: Style;
  light: DirectionStyle;
  dark: DirectionStyle;
};

export default (theme: Theme, { isDisabled = false }: ArrowProps): ArrowStyle => ({
  arrow: {
    content: '""',

    width: '30px',
    height: '100%',

    display: 'block',

    pointerEvents: 'none'
  },
  light: {
    left: {
      background: !isDisabled
        ? `linear-gradient(to right, ${theme.colors.gray[50]} 25%, rgba(0, 0, 0, 0) 75%)`
        : 'transparent'
    },
    right: {
      background: !isDisabled
        ? `linear-gradient(to left, ${theme.colors.gray[50]} 25%, rgba(0, 0, 0, 0) 75%)`
        : 'transparent'
    }
  },
  dark: {
    left: {
      background: !isDisabled
        ? `linear-gradient(to right, ${theme.colors.gray[900]} 25%, rgba(0, 0, 0, 0) 75%)`
        : 'transparent'
    },
    right: {
      background: !isDisabled
        ? `linear-gradient(to left, ${theme.colors.gray[900]} 25%, rgba(0, 0, 0, 0) 75%)`
        : 'transparent'
    }
  }
});
