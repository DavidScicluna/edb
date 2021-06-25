import { Style } from '../../../../../../common/types/types';
import { Theme } from '../../../../../../theme/types';

type ButtonStyle = {
  common: Style;
  light: Style;
  dark: Style;
};

export default (theme: Theme, isActive = false): ButtonStyle => ({
  common: {
    'cursor': 'pointer',
    'border': 'solid2',

    'minHeight': '36px',

    'backgroundColor': 'transparent',

    'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

    '& .chakra-icon': {
      fontSize: `${theme.fontSizes.xl} !important`,
      marginRight: theme.space['0.75'],
      transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
    },
    '& .chakra-text': {
      transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
    }
  },
  light: {
    'color': isActive ? 'blue.400' : 'gray.400',
    'borderColor': isActive ? 'blue.400' : 'gray.200',

    '&:hover': {
      color: isActive ? 'blue.600' : 'gray.900',
      borderColor: isActive ? 'blue.600' : 'gray.400'
    }
  },
  dark: {
    'color': isActive ? 'blue.400' : 'gray.500',
    'borderColor': isActive ? 'blue.400' : 'gray.700',

    '&:hover': {
      color: isActive ? 'blue.600' : 'gray.50',
      borderColor: isActive ? 'blue.600' : 'gray.500'
    }
  }
});
