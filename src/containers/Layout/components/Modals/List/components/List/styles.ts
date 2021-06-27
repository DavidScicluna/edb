import { Style } from '../../../../../../../common/types/types';
import { Theme } from '../../../../../../../theme/types';

type MediaTypeItemStyle = {
  common: { container: Style; icon: Style; text: { primary: Style; secondary: Style } };
  light: { container: Style; icon: Style; text: { primary: Style; secondary: Style } };
  dark: { container: Style; icon: Style; text: { primary: Style; secondary: Style } };
};

export default (theme: Theme, isSelected = false): MediaTypeItemStyle => ({
  common: {
    container: {
      'cursor': 'pointer',

      'width': '100%',

      'border': 'solid2',
      'borderRadius': 'lg',

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '& .chakra-icon': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      },
      '& .chakra-text': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      }
    },
    icon: {
      '&.MuiSvgIcon-root': {
        fontSize: theme.fontSizes['3xl']
      }
    },

    text: {
      primary: {
        align: 'left',
        fontSize: 'md',
        fontWeight: 'semibold',
        textTransform: 'capitalize'
      },
      secondary: {
        align: 'left',
        fontSize: 'xs',
        fontWeight: '400',
        textTransform: 'capitalize'
      }
    }
  },
  light: {
    container: {
      'borderColor': isSelected ? 'blue.400' : 'gray.200',
      'backgroundColor': isSelected ? 'blue.50' : 'transparent',

      '&:hover': {
        borderColor: isSelected ? 'blue.500' : 'gray.400',
        backgroundColor: isSelected ? 'blue.100' : 'transparent'
      }
    },
    icon: {
      color: isSelected ? 'blue.400' : 'gray.400'
    },
    text: {
      primary: {
        color: isSelected ? 'blue.400' : 'gray.900'
      },
      secondary: {
        color: isSelected ? 'blue.400' : 'gray.400'
      }
    }
  },
  dark: {
    container: {
      'borderColor': isSelected ? 'blue.400' : 'gray.700',
      'backgroundColor': isSelected ? 'blue.50' : 'transparent',

      '&:hover': {
        borderColor: isSelected ? 'blue.500' : 'gray.500',
        backgroundColor: isSelected ? 'blue.100' : 'transparent'
      }
    },
    icon: {
      color: isSelected ? 'blue.400' : 'gray.500'
    },
    text: {
      primary: {
        color: isSelected ? 'blue.400' : 'gray.50'
      },
      secondary: {
        color: isSelected ? 'blue.400' : 'gray.500'
      }
    }
  }
});
