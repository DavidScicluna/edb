import { Style } from '../../../../common/types';
import { Theme } from '../../../../theme/types';

type CommonStyle = {
  accordion: Style;
  light: Style;
  dark: Style;
};

type AccordionStyle = {
  disabled: CommonStyle;
} & CommonStyle;

export default (theme: Theme, isOpen = true): AccordionStyle => ({
  accordion: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',

    opacity: 1,

    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: 'lg',

    transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
  },
  disabled: {
    accordion: {
      opacity: 0.5
    },
    light: {
      'backgroundColor': 'transparent',
      'borderColor': 'gray.200',

      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'gray.200'
      },

      '&:active': {
        backgroundColor: 'transparent',
        borderColor: 'gray.200'
      }
    },
    dark: {
      'backgroundColor': 'transparent',
      'borderColor': 'gray.700',

      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'gray.700'
      },

      '&:active': {
        backgroundColor: 'transparent',
        borderColor: 'gray.700'
      }
    }
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
