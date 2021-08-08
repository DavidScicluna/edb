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

export default (theme: Theme, { color = 'gray', isFullWidth = false, isLightGray = false }: CardProps): CardStyle => ({
  card: {
    back: {
      'cursor': 'pointer',

      'width': isFullWidth ? '100%' : 'auto',
      'height': 'auto',

      'opacity': 1,

      'border': 'none',
      'borderRadius': 'lg',

      'padding': 0,

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-in-out']}`,

      '&:focus': {
        boxShadow: 'none'
      },

      '&:active .card_front': {
        transform: 'translateY(0)'
      },

      '& *': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-in-out']}`
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

      transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-in-out']}`
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
      'backgroundColor': isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`,

      '&:hover': {
        'backgroundColor': isLightGray && color === 'gray' ? 'gray.300' : `${color}.500`,

        '& .card_front': {
          borderColor: isLightGray && color === 'gray' ? 'gray.300' : `${color}.500`,
          backgroundColor: 'gray.50',
          color: isLightGray && color === 'gray' ? 'gray.300' : `${color}.500`
        }
      },

      '&:active': {
        'backgroundColor': isLightGray && color === 'gray' ? 'gray.300' : `${color}.500`,

        '& .card_front': {
          borderColor: isLightGray && color === 'gray' ? 'gray.300' : `${color}.500`,
          backgroundColor: 'gray.50',
          color: isLightGray && color === 'gray' ? 'gray.300' : `${color}.500`
        }
      }
    },
    front: {
      borderColor: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`,
      backgroundColor: 'gray.50',
      color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
    },
    disabled: {
      'backgroundColor': 'gray.50',

      '& .card_front': {
        borderColor: 'gray.200',
        backgroundColor: 'gray.50',
        color: 'gray.200'
      },

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        'backgroundColor': 'gray.50',

        '& .card_front': {
          borderColor: 'gray.300',
          backgroundColor: 'gray.50',
          color: 'gray.300'
        }
      },

      '&:hover': {
        'backgroundColor': 'gray.50',

        '& .card_front': {
          borderColor: 'gray.300',
          backgroundColor: 'gray.50',
          color: 'gray.300'
        }
      },

      '&:active': {
        'backgroundColor': 'gray.50',

        '& .card_front': {
          borderColor: 'gray.300',
          backgroundColor: 'gray.50',
          color: 'gray.300'
        }
      }
    }
  },
  dark: {
    back: {
      'backgroundColor': isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`,

      '&:hover': {
        'backgroundColor': isLightGray && color === 'gray' ? 'gray.600' : `${color}.400`,

        '& .card_front': {
          borderColor: isLightGray && color === 'gray' ? 'gray.600' : `${color}.400`,
          backgroundColor: 'gray.900',
          color: isLightGray && color === 'gray' ? 'gray.600' : `${color}.400`
        }
      },

      '&:active': {
        'backgroundColor': isLightGray && color === 'gray' ? 'gray.600' : `${color}.400`,

        '& .card_front': {
          borderColor: isLightGray && color === 'gray' ? 'gray.600' : `${color}.400`,
          backgroundColor: 'gray.900',
          color: isLightGray && color === 'gray' ? 'gray.600' : `${color}.400`
        }
      }
    },
    front: {
      borderColor: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`,
      backgroundColor: 'gray.900',
      color: `${color}.500`
    },
    disabled: {
      'backgroundColor': 'transparent',

      '& .card_front': {
        borderColor: 'gray.700',
        backgroundColor: 'gray.900',
        color: 'gray.700'
      },

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        'backgroundColor': 'transparent',

        '& .card_front': {
          borderColor: 'gray.600',
          backgroundColor: 'gray.900',
          color: 'gray.600'
        }
      },

      '&:hover': {
        'backgroundColor': 'transparent',

        '& .card_front': {
          borderColor: 'gray.600',
          backgroundColor: 'gray.900',
          color: 'gray.600'
        }
      },

      '&:active': {
        'backgroundColor': 'transparent',

        '& .card_front': {
          borderColor: 'gray.600',
          backgroundColor: 'gray.900',
          color: 'gray.600'
        }
      }
    }
  }
});
