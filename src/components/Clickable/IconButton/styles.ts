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
  {
    color = 'gray',
    size = 'md',
    variant = 'contained',
    isLoading = false,
    isLight = false
  }: Omit<IconButtonProps, 'aria-label' | 'icon'>
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

      'borderStyle': 'solid',
      'borderWidth': '0',
      'borderRadius': size === 'sm' ? 'base' : size === 'md' ? 'md' : 'lg',

      'padding': 0,

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

      '&:focus': {
        boxShadow: 'none'
      },

      '&:active .icon_button_front': {
        transform:
          variant !== 'icon'
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

      borderStyle: 'solid',
      borderWidth: variant !== 'icon' ? (size !== 'sm' ? '2px 2px 0' : '1px 1px 0') : '0',
      borderRadius: 'inherit',

      padding: size === 'sm' ? theme.space[0.5] : size === 'md' ? theme.space[1] : theme.space[1.5],

      transform: variant !== 'icon' ? `translateY(${size !== 'sm' ? '-4px' : '-3px'})` : 'none',

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
    },
    disabled: {
      'cursor': 'not-allowed',

      'opacity': isLoading ? 1 : 0.5,

      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
        '& .icon_button_front': { opacity: 1 }
      },

      '& .icon_button_front': {
        transform:
          variant !== 'icon'
            ? `translateY(${variant === 'contained' ? '0px' : size !== 'sm' ? '-2px' : '-1px'})`
            : 'none'
      },

      '&:hover .icon_button_front': {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5,

        transform:
          variant !== 'icon'
            ? `translateY(${variant === 'contained' ? '0px' : size !== 'sm' ? '-2px' : '-1px'})`
            : 'none'
      },

      '&:active .icon_button_front': {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5,

        transform:
          variant !== 'icon'
            ? `translateY(${variant === 'contained' ? '0px' : size !== 'sm' ? '-2px' : '-1px'})`
            : 'none'
      }
    },
    icon: {
      display: 'block',

      fontSize: `${
        size === 'sm' ? theme.fontSizes.xl : size === 'md' ? theme.fontSizes.xl : theme.fontSizes['2xl']
      } !important`
    }
  },
  light: {
    back: {
      contained: {
        'backgroundColor': `${color}.${isLight ? 400 : 600}`,

        '&:hover': {
          'backgroundColor': `${color}.${isLight ? 400 : 600}`,

          '& .icon_button_front': {
            borderColor: `${color}.${isLight ? 300 : 500}`,
            backgroundColor: `${color}.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.${isLight ? 400 : 600}`,

          '& .icon_button_front': {
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

          '& .icon_button_front': {
            borderColor: `${color}.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `${color}.${isLight ? 300 : 500}`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.${isLight ? 300 : 500}`,

          '& .icon_button_front': {
            borderColor: `${color}.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `${color}.${isLight ? 300 : 500}`
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
            color: `${color}.${isLight ? 300 : 500}`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
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
      icon: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.${isLight ? 200 : 400}`
      }
    },
    disabled: {
      contained: {
        'backgroundColor': `gray.${isLight ? 400 : 600}`,

        '& .icon_button_front': {
          borderColor: `gray.${isLight ? 200 : 400}`,
          backgroundColor: `gray.${isLight ? 200 : 400}`,
          color: 'gray.50'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `gray.${isLight ? 400 : 600}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: `gray.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        },

        '&:hover': {
          'backgroundColor': `gray.${isLight ? 400 : 600}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: `gray.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `gray.${isLight ? 400 : 600}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: `gray.${isLight ? 300 : 500}`,
            color: 'gray.50'
          }
        }
      },
      outlined: {
        'backgroundColor': `gray.${isLight ? 200 : 400}`,

        '& .icon_button_front': {
          borderColor: `gray.${isLight ? 200 : 400}`,
          backgroundColor: 'gray.50',
          color: `gray.${isLight ? 200 : 400}`
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `gray.${isLight ? 300 : 500}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `gray.${isLight ? 300 : 500}`
          }
        },

        '&:hover': {
          'backgroundColor': `gray.${isLight ? 300 : 500}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `gray.${isLight ? 300 : 500}`
          }
        },

        '&:active': {
          'backgroundColor': `gray.${isLight ? 300 : 500}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 300 : 500}`,
            backgroundColor: 'gray.50',
            color: `gray.${isLight ? 300 : 500}`
          }
        }
      },
      icon: {
        'backgroundColor': 'transparent',

        '& .icon_button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: `gray.${isLight ? 200 : 400}`
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 300 : 500}`
          }
        },

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 300 : 500}`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
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

          '& .icon_button_front': {
            borderColor: `${color}.${isLight ? 600 : 400}`,
            backgroundColor: `${color}.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.${isLight ? 500 : 300}`,

          '& .icon_button_front': {
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

          '& .icon_button_front': {
            borderColor: `${color}.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `${color}.${isLight ? 600 : 400}`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.${isLight ? 600 : 400}`,

          '& .icon_button_front': {
            borderColor: `${color}.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `${color}.${isLight ? 600 : 400}`
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
            color: `${color}.${isLight ? 600 : 400}`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
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
      icon: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.${isLight ? 700 : 500}`
      }
    },
    disabled: {
      contained: {
        'backgroundColor': `gray.${isLight ? 500 : 300}`,

        '& .icon_button_front': {
          borderColor: `gray.${isLight ? 700 : 500}`,
          backgroundColor: `gray.${isLight ? 700 : 500}`,
          color: 'gray.900'
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `gray.${isLight ? 500 : 300}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: `gray.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        },

        '&:hover': {
          'backgroundColor': `gray.${isLight ? 500 : 300}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: `gray.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `gray.${isLight ? 500 : 300}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: `gray.${isLight ? 600 : 400}`,
            color: 'gray.900'
          }
        }
      },
      outlined: {
        'backgroundColor': `gray.${isLight ? 700 : 500}`,

        '& .icon_button_front': {
          borderColor: `gray.${isLight ? 700 : 500}`,
          backgroundColor: 'gray.900',
          color: `gray.${isLight ? 700 : 500}`
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': `gray.${isLight ? 600 : 400}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `gray.${isLight ? 600 : 400}`
          }
        },

        '&:hover': {
          'backgroundColor': `gray.${isLight ? 600 : 400}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `gray.${isLight ? 600 : 400}`
          }
        },

        '&:active': {
          'backgroundColor': `gray.${isLight ? 600 : 400}`,

          '& .icon_button_front': {
            borderColor: `gray.${isLight ? 600 : 400}`,
            backgroundColor: 'gray.900',
            color: `gray.${isLight ? 600 : 400}`
          }
        }
      },
      icon: {
        'backgroundColor': 'transparent',

        '& .icon_button_front': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: `gray.${isLight ? 700 : 500}`
        },

        '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 600 : 400}`
          }
        },

        '&:hover': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 600 : 400}`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `gray.${isLight ? 600 : 400}`
          }
        }
      }
    }
  }
});
