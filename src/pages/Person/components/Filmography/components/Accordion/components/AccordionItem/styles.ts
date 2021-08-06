import { Style } from '../../../../../../../../common/types/types';
import { Theme } from '../../../../../../../../theme/types';
import { AccordionItemProps } from './types';

type Components = {
  accordion: Style;
  button: Style;
  icon: Style;
  panel: Style;
};

type AccordionItemStyle = {
  common: Components;
  light: Style;
  dark: Style;
};

export default (theme: Theme, { isExpanded = false }: AccordionItemProps): AccordionItemStyle => ({
  common: {
    accordion: {
      width: '100%',

      border: 'none',
      borderRadius: 'lg',

      transition: `${theme.transition.duration.fast} ${theme.transition.easing['ease-in-out']}`
    },
    button: {
      'width': '100%',

      'display': 'flex',
      'justifyContent': 'space-between',

      'backgroundColor': 'transparent',

      'padding': `${theme.space[1]} ${theme.space[2]}`,

      'transition': `${theme.transition.duration.fast} ${theme.transition.easing['ease-in-out']}`,

      '&:focus': { boxShadow: 'none' }
    },
    icon: {
      'transform': isExpanded ? 'rotate(360deg)' : 'rotate(270deg)',

      '&.MuiSvgIcon-root': {
        fontSize: 'xl',

        transition: `${theme.transition.duration.fast} ${theme.transition.easing['ease-in-out']}`
      }
    },
    panel: {
      padding: `${theme.space[1]} ${theme.space[2]}`,

      transition: `${theme.transition.duration.fast} ${theme.transition.easing['ease-in-out']}`
    }
  },
  light: {
    accordion: {
      'backgroundColor': isExpanded ? 'gray.100' : 'transparent',

      '&:hover': {
        'backgroundColor': 'gray.100',

        '& .chakra-accordion__button': {
          backgroundColor: 'transparent'
        },

        '& .MuiSvgIcon-root': {
          color: 'gray.900'
        }
      }
    }
  },
  dark: {
    accordion: {
      'backgroundColor': isExpanded ? 'gray.800' : 'transparent',

      '&:hover': {
        'backgroundColor': 'gray.800',

        '& .chakra-accordion__button': {
          backgroundColor: 'transparent'
        },

        '& .MuiSvgIcon-root': {
          color: 'gray.50'
        }
      }
    }
  }
});
