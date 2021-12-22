import { Style } from '../../../../../../common/types';
import { Theme } from '../../../../../../theme/types';

type BreadcrumbsStyle = {
  common: {
    breadcrumbItem: Style;
    breadcrumbLink: Style;
  };
  light: {
    breadcrumbActive: Style;
    breadcrumbLink: Style;
  };
  dark: {
    breadcrumbActive: Style;
    breadcrumbLink: Style;
  };
};

export default (theme: Theme): BreadcrumbsStyle => ({
  common: {
    breadcrumbItem: {
      fontWeight: 'medium',

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
    },
    breadcrumbLink: {
      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

      '&:hover': {
        textDecoration: 'none'
      }
    }
  },
  light: {
    breadcrumbActive: {
      color: 'gray.900'
    },
    breadcrumbLink: {
      'color': 'gray.400',

      '&:hover': {
        color: 'gray.900'
      }
    }
  },
  dark: {
    breadcrumbActive: {
      color: 'gray.50'
    },
    breadcrumbLink: {
      'color': 'gray.500',

      '&:hover': {
        color: 'gray.50'
      }
    }
  }
});
