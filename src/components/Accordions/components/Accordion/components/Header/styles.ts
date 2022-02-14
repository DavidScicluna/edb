import { Style } from '../../../../../../common/types';
import { Theme } from '../../../../../../theme/types';

type HeaderStyle = {
  header: Style;
  disabled: Style;
  light: Style;
  dark: Style;
};

export default (theme: Theme, isOpen = false): HeaderStyle => ({
  header: {
    'cursor': 'pointer',

    'width': '100%',

    'background': 'transparent',
    'backgroundColor': 'transparent',

    'p': 2,

    'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

    '& svg': {
      fontSize: theme.fontSizes.xl,
      transform: `rotate(${isOpen ? '90deg' : '0deg'})`,

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
    }
  },
  disabled: {
    'cursor': 'default',

    '& svg': {
      transform: 'rotate(0deg)'
    }
  },
  light: {
    '& svg': {
      color: 'gray.400'
    }
  },
  dark: {
    '& svg': {
      color: 'gray.500'
    }
  }
});
