import { Style } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import { CardProps } from './types';

type VariantStyle = {
  outlined: Style;
  transparent: Style;
};

type CommonStyle<S> = {
  back: S;
  front: S;
  disabled: S;
};

type CardStyle = {
  card: CommonStyle<Style>;
  light: Omit<CommonStyle<VariantStyle>, 'icon'>;
  dark: Omit<CommonStyle<VariantStyle>, 'icon'>;
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

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '&:focus': {
        boxShadow: 'none'
      },

      '&:active .card_front': {
        transform: 'translateY(0px)'
      }
    },
    front: {
      cursor: 'inherit',

      width: '100%',
      height: '100%',

      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',

      borderStyle: 'solid',
      borderWidth: '2px',
      borderRadius: 'inherit',

      transform: 'translateY(-4px)',

      transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
    },
    disabled: {
      'cursor': 'not-allowed',

      'opacity': 0.5,

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        '& .card_front': { opacity: 1 }
      },

      '& .card_front': {
        opacity: 1,

        transform: 'translateY(0px)'
      },

      '&:hover .card_front': {
        cursor: 'not-allowed',

        opacity: 1,

        transform: 'translateY(0px)'
      },

      '&:active .card_front': {
        cursor: 'not-allowed',

        opacity: 1,

        transform: 'translateY(0px)'
      }
    }
  },
  light: {
    back: {
      outlined: {
        'backgroundColor': isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`,

        '&:hover': {
          'backgroundColor': isLightGray && color === 'gray' ? 'gray.400' : `${color}.600`,

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.400' : `${color}.600`,
            backgroundColor: 'gray.50',
            color: isLightGray && color === 'gray' ? 'gray.400' : `${color}.600`
          }
        },

        '&:active': {
          'backgroundColor': isLightGray && color === 'gray' ? 'gray.400' : `${color}.600`,

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.400' : `${color}.600`,
            backgroundColor: 'gray.50',
            color: isLightGray && color === 'gray' ? 'gray.400' : `${color}.600`
          }
        }
      },
      transparent: {
        'backgroundColor': 'transparent',

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.400' : `${color}.600`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.400' : `${color}.600`
          }
        }
      }
    },
    front: {
      outlined: {
        borderColor: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`,
        backgroundColor: 'gray.50',
        color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
      },
      transparent: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
      }
    },
    disabled: {
      outlined: {
        'backgroundColor': 'gray.50',

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'gray.50',

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`,
            backgroundColor: 'gray.50',
            color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
          }
        },

        '& .card_front': {
          borderColor: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`,
          backgroundColor: 'gray.50',
          color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
        },

        '&:hover': {
          'backgroundColor': 'gray.50',

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`,
            backgroundColor: 'gray.50',
            color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': 'gray.50',

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`,
            backgroundColor: 'gray.50',
            color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
          }
        }
      },
      transparent: {
        'backgroundColor': 'transparent',

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
          }
        },

        '& .card_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
        },

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.200' : `${color}.400`
          }
        }
      }
    }
  },
  dark: {
    back: {
      outlined: {
        'backgroundColor': isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`,

        '&:hover': {
          'backgroundColor': isLightGray && color === 'gray' ? 'gray.500' : `${color}.200`,

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.500' : `${color}.200`,
            backgroundColor: 'gray.900',
            color: isLightGray && color === 'gray' ? 'gray.500' : `${color}.200`
          }
        },

        '&:active': {
          'backgroundColor': isLightGray && color === 'gray' ? 'gray.500' : `${color}.200`,

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.500' : `${color}.200`,
            backgroundColor: 'gray.900',
            color: isLightGray && color === 'gray' ? 'gray.500' : `${color}.200`
          }
        }
      },
      transparent: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.500' : `${color}.200`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.500' : `${color}.200`
          }
        }
      }
    },
    front: {
      outlined: {
        borderColor: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`,
        backgroundColor: 'gray.900',
        color: `${color}.500`
      },
      transparent: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.500`
      }
    },
    disabled: {
      outlined: {
        'backgroundColor': 'transparent',

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`,
            backgroundColor: 'gray.900',
            color: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`
          }
        },

        '& .card_front': {
          borderColor: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`,
          backgroundColor: 'gray.900',
          color: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`
        },

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`,
            backgroundColor: 'gray.900',
            color: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`,
            backgroundColor: 'gray.900',
            color: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`
          }
        }
      },
      transparent: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`
          }
        },

        '& .card_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`
        },

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .card_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: isLightGray && color === 'gray' ? 'gray.700' : `${color}.500`
          }
        }
      }
    }
  }
});
