import { Style } from '../../../../../../../../common/types';
import { Theme } from '../../../../../../../../theme/types';

type PanelStyle = {
  panel: Style;
  light: Style;
  dark: Style;
};

export default (theme: Theme, isOpen = true): PanelStyle => ({
  panel: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',

    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: 'lg',

    transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
  },
  light: {
    'backgroundColor': 'transparent',
    'borderColor': 'gray.200',

    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: !isOpen ? 'gray.400' : 'gray.200'
    },

    '&:active': {
      backgroundColor: 'transparent',
      borderColor: !isOpen ? 'gray.400' : 'gray.200'
    }
  },
  dark: {
    'backgroundColor': 'transparent',
    'borderColor': 'gray.700',

    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: !isOpen ? 'gray.500' : 'gray.700'
    },

    '&:active': {
      backgroundColor: 'transparent',
      borderColor: !isOpen ? 'gray.500' : 'gray.700'
    }
  }
});
