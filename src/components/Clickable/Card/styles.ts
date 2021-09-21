import { Style } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import { CardProps } from './types';

type CommonStyle = {
  back: Style;
  front: Style;
  disabled: Style;
};

type CardStyle = {
  card: CommonStyle;
  light: Omit<CommonStyle, 'icon'>;
  dark: Omit<CommonStyle, 'icon'>;
};

export default (
  theme: Theme,
  { color = 'gray', isFullWidth = false, isLight = false, isClickable = true }: CardProps
): CardStyle => ({
  card: {
    back: {
      'cursor': 'pointer',

      'width': isFullWidth ? '100%' : 'auto',
      'height': 'auto',

      'opacity': 1,

      'border': 'none',
      'borderRadius': 'lg',

      'padding': 0,

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

      '&:focus': {
        boxShadow: 'none'
      },

      '&:active .card_front': {
        transform: isClickable ? 'translateY(0)' : 'translateY(-2px)'
      },

      '& .MuiSvgIcon-root': {
        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
      }
    },
    front: {
      cursor: 'inherit',

      width: '100%',
      height: '100%',

      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',

      borderStyle: 'solid',
      borderWidth: '2px',
      borderRadius: 'inherit',

      transform: 'translateY(-2px)',

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
    },
    disabled: {
      'cursor': 'not-allowed',

      'opacity': 0.5,

      '& .card_front': {
        opacity: 1,

        transform: 'translateY(0)'
      },

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        '& .card_front': { opacity: 1 }
      },

      '&:hover .card_front': {
        cursor: 'not-allowed',

        opacity: 1,

        transform: 'translateY(0)'
      },

      '&:active .card_front': {
        cursor: 'not-allowed',

        opacity: 1,

        transform: 'translateY(0)'
      }
    }
  },
  light: {
    back: {
      'backgroundColor': `${color}.${isLight ? 200 : 400}`,

      '&:hover': {
        'backgroundColor': `${color}.${isLight ? 300 : 500}`,

        '& .card_front': {
          borderColor: `${color}.${isLight ? 300 : 500}`,
          backgroundColor: 'gray.50',
          color: `${color}.${isLight ? 300 : 500}`
        }
      },

      '&:active': {
        'backgroundColor': `${color}.${isLight ? 300 : 500}`,

        '& .card_front': {
          borderColor: `${color}.${isLight ? 300 : 500}`,
          backgroundColor: 'gray.50',
          color: `${color}.${isLight ? 300 : 500}`
        }
      }
    },
    front: {
      borderColor: `${color}.${isLight ? 200 : 400}`,
      backgroundColor: 'gray.50',
      color: `${color}.${isLight ? 200 : 400}`
    },
    disabled: {
      'backgroundColor': 'gray.50',

      '& .card_front': {
        borderColor: `gray.${isLight ? 200 : 400}`,
        backgroundColor: 'gray.50',
        color: `gray.${isLight ? 200 : 400}`
      },

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        'backgroundColor': 'gray.50',

        '& .card_front': {
          borderColor: `gray.${isLight ? 300 : 500}`,
          backgroundColor: 'gray.50',
          color: `gray.${isLight ? 300 : 500}`
        }
      },

      '&:hover': {
        'backgroundColor': 'gray.50',

        '& .card_front': {
          borderColor: `gray.${isLight ? 300 : 500}`,
          backgroundColor: 'gray.50',
          color: `gray.${isLight ? 300 : 500}`
        }
      },

      '&:active': {
        'backgroundColor': 'gray.50',

        '& .card_front': {
          borderColor: `gray.${isLight ? 300 : 500}`,
          backgroundColor: 'gray.50',
          color: `gray.${isLight ? 300 : 500}`
        }
      }
    }
  },
  dark: {
    back: {
      'backgroundColor': `${color}.${isLight ? 700 : 500}`,

      '&:hover': {
        'backgroundColor': `${color}.${isLight ? 600 : 400}`,

        '& .card_front': {
          borderColor: `${color}.${isLight ? 600 : 400}`,
          backgroundColor: 'gray.900',
          color: `${color}.${isLight ? 600 : 400}`
        }
      },

      '&:active': {
        'backgroundColor': `${color}.${isLight ? 600 : 400}`,

        '& .card_front': {
          borderColor: `${color}.${isLight ? 600 : 400}`,
          backgroundColor: 'gray.900',
          color: `${color}.${isLight ? 600 : 400}`
        }
      }
    },
    front: {
      borderColor: `${color}.${isLight ? 700 : 500}`,
      backgroundColor: 'gray.900',
      color: `${color}.${isLight ? 700 : 500}`
    },
    disabled: {
      'backgroundColor': 'transparent',

      '& .card_front': {
        borderColor: `gray.${isLight ? 700 : 500}`,
        backgroundColor: 'gray.900',
        color: `gray.${isLight ? 700 : 500}`
      },

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        'backgroundColor': 'transparent',

        '& .card_front': {
          borderColor: `gray.${isLight ? 600 : 400}`,
          backgroundColor: 'gray.900',
          color: `gray.${isLight ? 600 : 400}`
        }
      },

      '&:hover': {
        'backgroundColor': 'transparent',

        '& .card_front': {
          borderColor: `gray.${isLight ? 600 : 400}`,
          backgroundColor: 'gray.900',
          color: `gray.${isLight ? 600 : 400}`
        }
      },

      '&:active': {
        'backgroundColor': 'transparent',

        '& .card_front': {
          borderColor: `gray.${isLight ? 600 : 400}`,
          backgroundColor: 'gray.900',
          color: `gray.${isLight ? 600 : 400}`
        }
      }
    }
  }
});
