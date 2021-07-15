import { Style } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import { IconButtonProps } from './types';

type VariantStyle = {
  contained: Style;
  outlined: Style;
  icon: Style;
};

type CommonStyle<S> = {
  back: S;
  front: S;
  disabled: S;
  icon: Style;
};

type IconButtonStyle = {
  button: CommonStyle<Style>;
  light: Omit<CommonStyle<VariantStyle>, 'icon'>;
  dark: Omit<CommonStyle<VariantStyle>, 'icon'>;
};

export default (
  theme: Theme,
  { color = 'gray', size = 'md', variant = 'contained', isLoading = false }: IconButtonProps
): IconButtonStyle => ({
  button: {
    back: {
      'cursor': 'pointer',

      'width': 'auto',
      'height': 'auto',

      'minWidth': 'auto',
      'minHeight': 'auto',
      'maxWidth': 'none',
      'maxHeight': 'none',

      'opacity': 1,

      'border': 'none',
      'borderRadius': size === 'xs' ? 'sm' : size === 'lg' ? 'md' : 'base',

      'padding': 0,

      'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

      '& svg': {
        transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
      },

      '&:focus': {
        boxShadow: 'none'
      },

      '&:active .icon_button_front': {
        transform: 'translateY(0px)'
      }
    },
    front: {
      cursor: 'inherit',

      width: '100%',
      height: '100%',

      display: 'flex',
      justifyContent: 'center',

      borderStyle: 'solid',
      borderWidth: size === 'xs' ? '1px' : '2px',
      borderRadius: 'inherit',

      padding: size === 'xs' || size === 'md' ? theme.space[1] : theme.space[2],

      transform: variant !== 'icon' ? 'translateY(-2px)' : 'none',

      transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
    },
    disabled: {
      'cursor': 'not-allowed',

      'opacity': isLoading ? 1 : 0.5,

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        '& .icon_button_front': { opacity: 1 }
      },

      '& .icon_button_front': {
        transform: 'translateY(0px)'
      },

      '&:hover .icon_button_front': {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5,

        transform: 'translateY(0px)'
      },

      '&:active .icon_button_front': {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5,

        transform: 'translateY(0px)'
      }
    },
    icon: {
      display: 'block',

      fontSize: `${
        size === 'xs' ? theme.fontSizes.xl : size === 'md' ? theme.fontSizes['2xl'] : theme.fontSizes['3xl']
      } !important`
    }
  },
  light: {
    back: {
      contained: {
        'backgroundColor': `${color}.600`,

        '&:hover': {
          'backgroundColor': `${color}.600`,

          '& .icon_button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .icon_button_front': {
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

          '& .icon_button_front': {
            borderColor: `${color}.600`,
            backgroundColor: 'gray.50',
            color: `${color}.600`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .icon_button_front': {
            borderColor: `${color}.600`,
            backgroundColor: 'gray.50',
            color: `${color}.600`
          }
        }
      },
      icon: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.600`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
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
      icon: {
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

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.50'
          }
        },

        '& .icon_button_front': {
          borderColor: `${color}.400`,
          backgroundColor: `${color}.400`,
          color: 'gray.50'
        },

        '&:hover': {
          'backgroundColor': `${color}.600`,

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .icon_button_front': {
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

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.50',
            color: `${color}.400`
          }
        },

        '& .icon_button_front': {
          borderColor: `${color}.400`,
          backgroundColor: 'gray.50',
          color: `${color}.400`
        },

        '&:hover': {
          'backgroundColor': `${color}.400`,

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.50',
            color: `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.400`,

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.50',
            color: `${color}.400`
          }
        }
      },
      icon: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.400`
          }
        },

        '& .icon_button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: `${color}.400`
        },

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
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

          '& .icon_button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .icon_button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.50'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.500`,

        '&:hover': {
          'backgroundColor': `${color}.200`,

          '& .icon_button_front': {
            borderColor: `${color}.200`,
            backgroundColor: 'gray.900',
            color: `${color}.200`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.200`,

          '& .icon_button_front': {
            borderColor: `${color}.200`,
            backgroundColor: 'gray.900',
            color: `${color}.200`
          }
        }
      },
      icon: {
        'backgroundColor': 'transparent',

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.200`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
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
        color: 'gray.50'
      },
      outlined: {
        borderColor: `${color}.500`,
        backgroundColor: 'gray.900',
        color: `${color}.500`
      },
      icon: {
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

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.50'
          }
        },

        '& .icon_button_front': {
          borderColor: `${color}.400`,
          backgroundColor: `${color}.400`,
          color: 'gray.50'
        },

        '&:hover': {
          'backgroundColor': `${color}.600`,

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.600`,

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.50'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.500`,

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `${color}.500`,

          '& .icon_button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.900',
            color: `${color}.500`
          }
        },

        '& .icon_button_front': {
          borderColor: `${color}.500`,
          backgroundColor: 'gray.900',
          color: `${color}.500`
        },

        '&:hover': {
          'backgroundColor': `${color}.500`,

          '& .icon_button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.900',
            color: `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.500`,

          '& .icon_button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.900',
            color: `${color}.500`
          }
        }
      },
      icon: {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.500`
          }
        },

        '& .icon_button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: `${color}.500`
        },

        '&:hover': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.500`
          }
        }
      }
    }
  }
});
