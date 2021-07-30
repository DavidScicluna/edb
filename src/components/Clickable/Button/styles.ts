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
      'height': 'auto',

      'minWidth': 'auto',
      'minHeight': 'auto',
      'maxWidth': 'none',
      'maxHeight': 'none',

      'opacity': 1,

      'borderStyle': 'solid',
      'borderWidth': '0',
      'borderRadius': size === 'sm' ? 'base' : size === 'md' ? 'md' : 'lg',

      'padding': 0,

      'transition': 'none',
      // transitionProperty: `${[theme.transition.property.background, theme.transition.property.colors].join(', ')}`,
      // transitionDuration: `${theme.transition.duration.normal} !important`,
      // transitionTimingFunction: `${theme.transition.easing['ease-out']} !important`,

      '&:focus': {
        boxShadow: 'none'
      },

      '&:active .button_front': {
        transform:
          variant !== 'text'
            ? `translateY(${variant === 'contained' ? '0px' : size !== 'sm' ? '-2px' : '-1px'})`
            : 'none'
      },

      '& *': {
        transition: 'none !important'
        // transitionProperty: `${[theme.transition.property.background, theme.transition.property.colors].join(', ')}`,
        // transitionDuration: `${theme.transition.duration.normal} !important`,
        // transitionTimingFunction: `${theme.transition.easing['ease-out']} !important`,
      }
    },
    front: {
      cursor: 'inherit',

      width: '100%',
      height: '100%',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      fontWeight: 'semibold',
      fontSize: size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md',
      textTransform: 'uppercase',

      borderStyle: 'solid',
      borderWidth: variant !== 'text' ? (size !== 'sm' ? '2px 2px 0' : '1px 1px 0') : '0',
      borderRadius: 'inherit',

      padding:
        size === 'sm'
          ? `${theme.space[0.75]} ${theme.space[1.5]}`
          : size === 'md'
          ? `${theme.space[1]} ${theme.space[2]}`
          : `${theme.space[1.5]} ${theme.space[3]}`,

      transform: variant !== 'text' ? `translateY(${size !== 'sm' ? '-4px' : '-3px'})` : 'none',

      transition: 'none'
      // transitionProperty: `${[theme.transition.property.background, theme.transition.property.colors].join(', ')}`,
      // transitionDuration: `${theme.transition.duration.normal} !important`,
      // transitionTimingFunction: `${theme.transition.easing['ease-out']} !important`,
    },
    disabled: {
      'cursor': 'not-allowed',

      'opacity': isLoading ? 1 : 0.5,

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        '& .button_front': { opacity: 1 }
      },

      '& .button_front': {
        transform:
          variant !== 'text'
            ? `translateY(${variant === 'contained' ? '0px' : size !== 'sm' ? '-2px' : '-1px'})`
            : 'none'
      },

      '&:hover .button_front': {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5,

        transform:
          variant !== 'text'
            ? `translateY(${variant === 'contained' ? '0px' : size !== 'sm' ? '-2px' : '-1px'})`
            : 'none'
      },

      '&:active .button_front': {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5,

        transform:
          variant !== 'text'
            ? `translateY(${variant === 'contained' ? '0px' : size !== 'sm' ? '-2px' : '-1px'})`
            : 'none'
      }
    },
    icon: {
      display: 'block',

      fontSize: `${
        size === 'sm' ? theme.fontSizes.sm : size === 'md' ? theme.fontSizes.md : theme.fontSizes.lg
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
          'backgroundColor': `${color}.500`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.50',
            color: `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.500`,

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.50',
            color: `${color}.500`
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
        'backgroundColor': 'gray.600',

        '& .button_front': {
          borderColor: 'gray.400',
          backgroundColor: 'gray.400',
          color: 'gray.50'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'gray.600',

          '& .button_front': {
            borderColor: 'gray.500',
            backgroundColor: 'gray.500',
            color: 'gray.50'
          }
        },

        '&:hover': {
          'backgroundColor': 'gray.600',

          '& .button_front': {
            borderColor: 'gray.500',
            backgroundColor: 'gray.500',
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': 'gray.600',

          '& .button_front': {
            borderColor: 'gray.500',
            backgroundColor: 'gray.500',
            color: 'gray.50'
          }
        }
      },
      outlined: {
        'backgroundColor': 'gray.400',

        '& .button_front': {
          borderColor: 'gray.400',
          backgroundColor: 'gray.50',
          color: 'gray.400'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'gray.500',

          '& .button_front': {
            borderColor: 'gray.500',
            backgroundColor: 'gray.50',
            color: 'gray.500'
          }
        },

        '&:hover': {
          'backgroundColor': 'gray.500',

          '& .button_front': {
            borderColor: 'gray.500',
            backgroundColor: 'gray.50',
            color: 'gray.500'
          }
        },

        '&:active': {
          'backgroundColor': 'gray.500',

          '& .button_front': {
            borderColor: 'gray.500',
            backgroundColor: 'gray.50',
            color: 'gray.500'
          }
        }
      },
      text: {
        'backgroundColor': 'transparent',

        '& .button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: 'gray.400'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: 'gray.500'
          }
        },

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: 'gray.500'
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: 'gray.500'
          }
        }
      }
    }
  },
  dark: {
    back: {
      contained: {
        'backgroundColor': `${color}.300`,

        '&:hover': {
          'backgroundColor': `${color}.300`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.300`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.900'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.500`,

        '&:hover': {
          'backgroundColor': `${color}.400`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.900',
            color: `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.400`,

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.900',
            color: `${color}.400`
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
    },
    front: {
      contained: {
        borderColor: `${color}.500`,
        backgroundColor: `${color}.500`,
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
        'backgroundColor': 'gray.300',

        '& .button_front': {
          borderColor: 'gray.500',
          backgroundColor: 'gray.500',
          color: 'gray.900'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'gray.300',

          '& .button_front': {
            borderColor: 'gray.400',
            backgroundColor: 'gray.400',
            color: 'gray.900'
          }
        },

        '&:hover': {
          'backgroundColor': 'gray.300',

          '& .button_front': {
            borderColor: 'gray.400',
            backgroundColor: 'gray.400',
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': 'gray.300',

          '& .button_front': {
            borderColor: 'gray.400',
            backgroundColor: 'gray.400',
            color: 'gray.900'
          }
        }
      },
      outlined: {
        'backgroundColor': 'gray.500',

        '& .button_front': {
          borderColor: 'gray.500',
          backgroundColor: 'gray.900',
          color: 'gray.500'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'gray.400',

          '& .button_front': {
            borderColor: 'gray.400',
            backgroundColor: 'gray.900',
            color: 'gray.400'
          }
        },

        '&:hover': {
          'backgroundColor': 'gray.400',

          '& .button_front': {
            borderColor: 'gray.400',
            backgroundColor: 'gray.900',
            color: 'gray.400'
          }
        },

        '&:active': {
          'backgroundColor': 'gray.400',

          '& .button_front': {
            borderColor: 'gray.400',
            backgroundColor: 'gray.900',
            color: 'gray.400'
          }
        }
      },
      text: {
        'backgroundColor': 'transparent',

        '& .button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: 'gray.500'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: 'gray.400'
          }
        },

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: 'gray.400'
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: 'gray.400'
          }
        }
      }
    }
  }
});
