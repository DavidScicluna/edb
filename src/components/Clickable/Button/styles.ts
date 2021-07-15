import { Style } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import { ButtonProps } from './types';

type VariantStyle = {
  contained: Style;
  outlined: Style;
  text: Style;
};

type CommonStyle<S> = {
  back: S;
  front: S;
  disabled: S;
  icon: Style;
};

type ButtonStyle = {
  button: CommonStyle<Style>;
  light: Omit<CommonStyle<VariantStyle>, 'icon'>;
  dark: Omit<CommonStyle<VariantStyle>, 'icon'>;
};

export default (
  theme: Theme,
  { color = 'gray', size = 'md', variant = 'contained', isFullWidth = false, isLoading = false }: ButtonProps
): ButtonStyle => ({
  button: {
    back: {
      'cursor': 'pointer',

      'width': isFullWidth ? '100%' : 'auto',
      'height': size === 'md' ? '44px' : 'auto',

      'minWidth': 'auto',
      'minHeight': 'auto',
      'maxWidth': 'none',
      'maxHeight': 'none',

      'opacity': 1,

      'border': 'none',
      'borderRadius': 'base',

      'padding': 0,

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '& svg': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      },

      '&:focus': {
        boxShadow: 'none'
      },

      '&:active .button_front': {
        transform: 'translateY(0px)'
      }
    },
    front: {
      cursor: 'inherit',

      width: '100%',
      height: '100%',

      display: 'flex',
      justifyContent: 'center',

      fontWeight: 'semibold',
      fontSize: size === 'xs' ? 'xs' : size === 'md' ? 'sm' : 'md',
      textTransform: 'uppercase',

      borderStyle: 'solid',
      borderWidth: '2px',
      borderRadius: 'inherit',

      padding:
        size === 'xs'
          ? `${theme.space[0.75]} ${theme.space[1.5]}`
          : size === 'md'
          ? `${theme.space[1]} ${theme.space[2]}`
          : `${theme.space[1.5]} ${theme.space[3]}`,

      transform: variant !== 'text' ? 'translateY(-2px)' : 'none',

      transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
    },
    disabled: {
      'cursor': 'not-allowed',

      'opacity': isLoading ? 1 : 0.5,

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        '& .button_front': { opacity: 1 }
      },

      '& .button_front': {
        transform: 'translateY(0px)'
      },

      '&:hover .button_front': {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5,

        transform: 'translateY(0px)'
      },

      '&:active .button_front': {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5,

        transform: 'translateY(0px)'
      }
    },
    icon: {
      display: 'block',

      fontSize: `${
        size === 'xs' ? theme.fontSizes.sm : size === 'md' ? theme.fontSizes.md : theme.fontSizes.lg
      } !important`
    }
  },
  light: {
    back: {
      contained: {
        'backgroundColor': `${color}.600`,

        '&:hover': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.50'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.400`,

        '&:hover': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.600`,
            backgroundColor: 'gray.50',
            color: `${color}.600`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.600`,
            backgroundColor: 'gray.50',
            color: `${color}.600`
          }
        }
      },
      text: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.600`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.600`
          }
        }
      }
    },
    front: {
      contained: {
        borderColor: `${color}.400`,
        backgroundColor: `${color}.400`,
        color: 'gray.50'
      },
      outlined: {
        borderColor: `${color}.400`,
        backgroundColor: 'gray.50',
        color: `${color}.400`
      },
      text: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.400`
      }
    },
    disabled: {
      contained: {
        'backgroundColor': `${color}.600`,

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.50'
          }
        },

        '& .button_front': {
          borderColor: `${color}.400`,
          backgroundColor: `${color}.400`,
          color: 'gray.50'
        },

        '&:hover': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.50'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.400`,

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `${color}.400`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.50',
            color: `${color}.400`
          }
        },

        '& .button_front': {
          borderColor: `${color}.400`,
          backgroundColor: 'gray.50',
          color: `${color}.400`
        },

        '&:hover': {
          'backgroundColor': `${color}.400`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.50',
            color: `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.400`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.50',
            color: `${color}.400`
          }
        }
      },
      text: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.400`
          }
        },

        '& .button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: `${color}.400`
        },

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.400`
          }
        }
      }
    }
  },
  dark: {
    back: {
      contained: {
        'backgroundColor': `${color}.600`,

        '&:hover': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.900'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.500`,

        '&:hover': {
          'backgroundColor': `${color}.200`,

          '& .button_front': {
            borderColor: `${color}.200`,
            backgroundColor: 'gray.900',
            color: `${color}.200`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.200`,

          '& .button_front': {
            borderColor: `${color}.200`,
            backgroundColor: 'gray.900',
            color: `${color}.200`
          }
        }
      },
      text: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.200`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.200`
          }
        }
      }
    },
    front: {
      contained: {
        borderColor: `${color}.400`,
        backgroundColor: `${color}.400`,
        color: 'gray.900'
      },
      outlined: {
        borderColor: `${color}.500`,
        backgroundColor: 'gray.900',
        color: `${color}.500`
      },
      text: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.500`
      }
    },
    disabled: {
      contained: {
        'backgroundColor': `${color}.600`,

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.900'
          }
        },

        '& .button_front': {
          borderColor: `${color}.400`,
          backgroundColor: `${color}.400`,
          color: 'gray.900'
        },

        '&:hover': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.900'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.500`,

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `${color}.500`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.900',
            color: `${color}.500`
          }
        },

        '& .button_front': {
          borderColor: `${color}.500`,
          backgroundColor: 'gray.900',
          color: `${color}.500`
        },

        '&:hover': {
          'backgroundColor': `${color}.500`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.900',
            color: `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.500`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.900',
            color: `${color}.500`
          }
        }
      },
      text: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.500`
          }
        },

        '& .button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: `${color}.500`
        },

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.500`
          }
        }
      }
    }
  }
});
