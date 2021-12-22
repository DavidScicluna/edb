import { Style } from '../../../common/types';
import { Theme } from '../../../theme/types';
import { IconButtonProps, Variant, Size } from './types';

type VariantStyle = { [key in Variant]: Style };

type SizeStyle = { [key in Size]: Style };

type DefaultStyle = { default: Style };

type CommonStyle<S> = {
  back: S;
  front: S;
  disabled: S;
};

type IconButtonStyle = {
  iconButton: CommonStyle<DefaultStyle & SizeStyle>;
  light: CommonStyle<VariantStyle>;
  dark: CommonStyle<VariantStyle>;
};

type StyleIconButtonProps = {
  color: IconButtonProps['color'];
  isLoading: IconButtonProps['isLoading'];
  variant: IconButtonProps['variant'];
};

export default (
  theme: Theme,
  { color = 'gray', isLoading = false, variant = 'contained' }: StyleIconButtonProps
): IconButtonStyle => ({
  iconButton: {
    back: {
      default: {
        'cursor': 'pointer',

        'width': 'auto',
        'height': 'auto',

        'minWidth': 'auto',
        'minHeight': 'auto',
        'maxWidth': 'none',
        'maxHeight': 'none',

        'userSelect': 'none',

        'opacity': 1,

        'border': 'none',
        'outline': 'none',
        'outlineWidth': '0px',
        'outlineStyle': 'dashed',

        'padding': 0,

        'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

        '&:focus': {
          boxShadow: 'none'
        },

        '& svg': {
          transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
        }
      },
      sm: {
        'borderRadius': 'sm',

        '&:hover .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-4px)' : 'none'
        },

        '&:active .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-1px)' : 'none'
        },

        '&:focus': {
          outlineOffset: '4px'
        }
      },
      md: {
        'borderRadius': 'base',

        '&:hover .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-5px)' : 'none'
        },

        '&:active .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-2px)' : 'none'
        },

        '&:focus': {
          outlineOffset: '5px'
        }
      },
      lg: {
        'borderRadius': 'lg',

        '&:hover .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-6px)' : 'none'
        },

        '&:active .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-2px)' : 'none'
        },

        '&:focus': {
          outlineOffset: '6px'
        }
      }
    },
    front: {
      default: {
        cursor: 'inherit',

        width: '100%',
        height: '100%',

        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',

        userSelect: 'none',

        borderStyle: 'solid',

        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
      },
      sm: {
        borderRadius: 'sm',
        borderWidth: variant !== 'icon' ? '1px 1px 0' : '0',

        padding: theme.space['0.5'],

        transform: variant !== 'icon' ? 'translateY(-3px)' : 'none'
      },
      md: {
        borderRadius: 'base',
        borderWidth: variant !== 'icon' ? '2px 2px 0' : '0',

        padding: theme.space[1],

        transform: variant !== 'icon' ? 'translateY(-4px)' : 'none'
      },
      lg: {
        borderRadius: 'lg',
        borderWidth: variant !== 'icon' ? '2px 2px 0' : '0',

        padding: theme.space[1.5],

        transform: variant !== 'icon' ? 'translateY(-5px)' : 'none'
      }
    },
    disabled: {
      default: {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5
      },
      sm: {
        '& .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-1px) !important' : 'none !important'
        }
      },
      md: {
        '& .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-2px) !important' : 'none !important'
        }
      },
      lg: {
        '& .icon_button_front': {
          transform: variant !== 'icon' ? 'translateY(-2px) !important' : 'none !important'
        }
      }
    }
  },
  light: {
    back: {
      contained: {
        'backgroundColor': `${color}.700`,

        '&:hover': {
          'backgroundColor': `${color}.700`,

          '& .icon_button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.700`,

          '& .icon_button_front': {
            borderColor: `${color}.700`,
            backgroundColor: `${color}.700`,
            color: 'gray.50'
          }
        },

        '&:focus': {
          outlineColor: `${color}.700`
        }
      },
      outlined: {
        'backgroundColor': `${color}.500`,

        '&:hover': {
          'backgroundColor': `${color}.500`,

          '& .icon_button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.50',
            color: `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.700`,

          '& .icon_button_front': {
            borderColor: `${color}.700`,
            backgroundColor: 'gray.50',
            color: `${color}.700`
          }
        },

        '&:focus': {
          outlineColor: `${color}.700`
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
            color: `${color}.700`
          }
        },

        '&:focus': {
          outlineColor: `${color}.700`
        }
      }
    },
    front: {
      contained: {
        borderColor: `${color}.500`,
        backgroundColor: `${color}.500`,
        color: 'gray.50'
      },
      outlined: {
        borderColor: `${color}.500`,
        backgroundColor: 'gray.50',
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
        'background': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
        'backgroundColor': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,

        '& .icon_button_front': {
          borderColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
          backgroundColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
          color: `${theme.colors.gray[50]} !important`
        }
      },
      outlined: {
        'background': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
        'backgroundColor': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,

        '& .icon_button_front': {
          borderColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
          backgroundColor: `${theme.colors.gray[50]} !important`,
          color: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`
        }
      },
      icon: {
        'background': 'transparent !important',
        'backgroundColor': 'transparent !important',

        '& .icon_button_front': {
          borderColor: 'transparent !important',
          backgroundColor: 'transparent !important',
          color: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`
        }
      }
    }
  },
  dark: {
    back: {
      contained: {
        'backgroundColor': `${color}.200`,

        '&:hover': {
          'backgroundColor': `${color}.200`,

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.200`,

          '& .icon_button_front': {
            borderColor: `${color}.200`,
            backgroundColor: `${color}.200`,
            color: 'gray.900'
          }
        },

        '&:focus': {
          outlineColor: `${color}.200`
        }
      },
      outlined: {
        'backgroundColor': `${color}.400`,

        '&:hover': {
          'backgroundColor': `${color}.400`,

          '& .icon_button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.900',
            color: `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.200`,

          '& .icon_button_front': {
            borderColor: `${color}.200`,
            backgroundColor: 'gray.900',
            color: `${color}.200`
          }
        },

        '&:focus': {
          outlineColor: `${color}.200`
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
            color: `${color}.300`
          }
        },

        '&:active': {
          'backgroundColor': 'transparent',
          'borderColor': 'transparent',

          '& .icon_button_front': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: `${color}.200`
          }
        },

        '&:focus': {
          outlineColor: `${color}.200`
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
        borderColor: `${color}.400`,
        backgroundColor: 'gray.900',
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
        'background': `${theme.colors.gray[400]} !important`,
        'backgroundColor': `${theme.colors.gray[400]} !important`,

        '& .icon_button_front': {
          borderColor: `${theme.colors.gray[400]} !important`,
          backgroundColor: `${theme.colors.gray[400]} !important`,
          color: `${theme.colors.gray[50]} !important`
        }
      },
      outlined: {
        'background': `${theme.colors.gray[400]} !important`,
        'backgroundColor': `${theme.colors.gray[400]} !important`,

        '& .icon_button_front': {
          borderColor: `${theme.colors.gray[400]} !important`,
          backgroundColor: `${theme.colors.gray[50]} !important`,
          color: `${theme.colors.gray[400]} !important`
        }
      },
      icon: {
        'background': 'transparent !important',
        'backgroundColor': 'transparent !important',

        '& .icon_button_front': {
          borderColor: 'transparent !important',
          backgroundColor: 'transparent !important',
          color: `${theme.colors.gray[400]} !important`
        }
      }
    }
  }
});
