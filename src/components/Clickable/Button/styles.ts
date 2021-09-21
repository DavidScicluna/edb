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
  {
    color = 'gray',
    size = 'md',
    variant = 'contained',
    isFullWidth = false,
    isLoading = false,
    isLight = false
  }: ButtonProps
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

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

      '&:focus': {
        boxShadow: 'none'
      },

      '&:active .button_front': {
        transform:
          variant !== 'text'
            ? `translateY(${variant === 'contained' ? '0px' : size !== 'sm' ? '-2px' : '-1px'})`
            : 'none'
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
      alignItems: 'center',
      justifyContent: 'center',

      fontWeight: 'semibold',
      fontSize: size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',

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

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
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
        'backgroundColor': `${color}.${isLight ? 400 : 600}`,

        '&:hover': {
          'backgroundColor': `${color}.${isLight ? 400 : 600}`,

          '& .button_front': {
            borderColor: `${color}.${isLight ? 300 : 500}`,
            backgroundColor: `${color}.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.${isLight ? 400 : 600}`,

          '& .button_front': {
            borderColor: `${color}.${isLight ? 300 : 500}`,
            backgroundColor: `${color}.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.${isLight ? 200 : 400}`,

        '&:hover': {
          'backgroundColor': `${color}.${isLight ? 300 : 500}`,

          '& .button_front': {
            borderColor: `${color}.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `${color}.${isLight ? 300 : 500}`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.${isLight ? 300 : 500}`,

          '& .button_front': {
            borderColor: `${color}.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `${color}.${isLight ? 300 : 500}`
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
            color: `${color}.${isLight ? 300 : 500}`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.${isLight ? 300 : 500}`
          }
        }
      }
    },
    front: {
      contained: {
        borderColor: `${color}.${isLight ? 200 : 400}`,
        backgroundColor: `${color}.${isLight ? 200 : 400}`,
        color: 'gray.50'
      },
      outlined: {
        borderColor: `${color}.${isLight ? 200 : 400}`,
        backgroundColor: 'gray.50',
        color: `${color}.${isLight ? 200 : 400}`
      },
      text: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.${isLight ? 200 : 400}`
      }
    },
    disabled: {
      contained: {
        'backgroundColor': `gray.${isLight ? 400 : 600}`,

        '& .button_front': {
          borderColor: `gray.${isLight ? 200 : 400}`,
          backgroundColor: `gray.${isLight ? 200 : 400}`,
          color: 'gray.50'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `gray.${isLight ? 400 : 600}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: `gray.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        },

        '&:hover': {
          'backgroundColor': `gray.${isLight ? 400 : 600}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: `gray.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `gray.${isLight ? 400 : 600}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: `gray.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        }
      },
      outlined: {
        'backgroundColor': `gray.${isLight ? 200 : 400}`,

        '& .button_front': {
          borderColor: `gray.${isLight ? 200 : 400}`,
          backgroundColor: 'gray.50',
          color: `gray.${isLight ? 200 : 400}`
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `gray.${isLight ? 300 : 500}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `gray.${isLight ? 300 : 500}`
          }
        },

        '&:hover': {
          'backgroundColor': `gray.${isLight ? 300 : 500}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `gray.${isLight ? 300 : 500}`
          }
        },

        '&:active': {
          'backgroundColor': `gray.${isLight ? 300 : 500}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `gray.${isLight ? 300 : 500}`
          }
        }
      },
      text: {
        'backgroundColor': 'transparent',

        '& .button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: `gray.${isLight ? 200 : 400}`
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 300 : 500}`
          }
        },

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 300 : 500}`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 300 : 500}`
          }
        }
      }
    }
  },
  dark: {
    back: {
      contained: {
        'backgroundColor': `${color}.${isLight ? 500 : 300}`,

        '&:hover': {
          'backgroundColor': `${color}.${isLight ? 500 : 300}`,

          '& .button_front': {
            borderColor: `${color}.${isLight ? 600 : 400}`,
            backgroundColor: `${color}.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.${isLight ? 500 : 300}`,

          '& .button_front': {
            borderColor: `${color}.${isLight ? 600 : 400}`,
            backgroundColor: `${color}.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        }
      },
      outlined: {
        'backgroundColor': `${color}.${isLight ? 700 : 500}`,

        '&:hover': {
          'backgroundColor': `${color}.${isLight ? 600 : 400}`,

          '& .button_front': {
            borderColor: `${color}.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `${color}.${isLight ? 600 : 400}`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.${isLight ? 600 : 400}`,

          '& .button_front': {
            borderColor: `${color}.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `${color}.${isLight ? 600 : 400}`
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
            color: `${color}.${isLight ? 600 : 400}`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.${isLight ? 600 : 400}`
          }
        }
      }
    },
    front: {
      contained: {
        borderColor: `${color}.${isLight ? 700 : 500}`,
        backgroundColor: `${color}.${isLight ? 700 : 500}`,
        color: 'gray.900'
      },
      outlined: {
        borderColor: `${color}.${isLight ? 700 : 500}`,
        backgroundColor: 'gray.900',
        color: `${color}.${isLight ? 700 : 500}`
      },
      text: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.${isLight ? 700 : 500}`
      }
    },
    disabled: {
      contained: {
        'backgroundColor': `gray.${isLight ? 500 : 300}`,

        '& .button_front': {
          borderColor: `gray.${isLight ? 700 : 500}`,
          backgroundColor: `gray.${isLight ? 700 : 500}`,
          color: 'gray.900'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `gray.${isLight ? 500 : 300}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: `gray.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        },

        '&:hover': {
          'backgroundColor': `gray.${isLight ? 500 : 300}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: `gray.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `gray.${isLight ? 500 : 300}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: `gray.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        }
      },
      outlined: {
        'backgroundColor': `gray.${isLight ? 700 : 500}`,

        '& .button_front': {
          borderColor: `gray.${isLight ? 700 : 500}`,
          backgroundColor: 'gray.900',
          color: `gray.${isLight ? 700 : 500}`
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `gray.${isLight ? 600 : 400}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `gray.${isLight ? 600 : 400}`
          }
        },

        '&:hover': {
          'backgroundColor': `gray.${isLight ? 600 : 400}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `gray.${isLight ? 600 : 400}`
          }
        },

        '&:active': {
          'backgroundColor': `gray.${isLight ? 600 : 400}`,

          '& .button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `gray.${isLight ? 600 : 400}`
          }
        }
      },
      text: {
        'backgroundColor': 'transparent',

        '& .button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: `gray.${isLight ? 700 : 500}`
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 600 : 400}`
          }
        },

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 600 : 400}`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 600 : 400}`
          }
        }
      }
    }
  }
});
