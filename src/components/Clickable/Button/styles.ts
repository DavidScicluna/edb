import { Style } from '../../../common/types';
import { Theme } from '../../../theme/types';
import { ButtonProps, Variant, Size } from './types';

type VariantStyle = { [key in Variant]: Style };

type SizeStyle = { [key in Size]: Style };

type CommonStyle<S> = {
  back: S;
  front: S;
  disabled: S;
};

type DefaultStyle = { default: Style };

type ButtonStyle = {
  button: CommonStyle<DefaultStyle & SizeStyle>;
  light: CommonStyle<VariantStyle>;
  dark: CommonStyle<VariantStyle>;
};

type StyleButtonProps = {
  color: ButtonProps['color'];
  isFullWidth: ButtonProps['isFullWidth'];
  isLoading: ButtonProps['isLoading'];
  variant: ButtonProps['variant'];
};

export default (
  theme: Theme,
  { color = 'gray', isFullWidth = false, isLoading = false, variant = 'contained' }: StyleButtonProps
): ButtonStyle => ({
  button: {
    back: {
      default: {
        'cursor': 'pointer',

        'width': isFullWidth ? '100%' : 'auto',
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

        '&:hover .button_front': {
          transform: variant !== 'text' ? 'translateY(-4px)' : 'none'
        },

        '&:active .button_front': {
          transform: variant !== 'text' ? 'translateY(-1px)' : 'none'
        },

        '&:focus': {
          outlineOffset: '4px'
        }
      },
      md: {
        'borderRadius': 'base',

        '&:hover .button_front': {
          transform: variant !== 'text' ? 'translateY(-5px)' : 'none'
        },

        '&:active .button_front': {
          transform: variant !== 'text' ? 'translateY(-2px)' : 'none'
        },

        '&:focus': {
          outlineOffset: '5px'
        }
      },
      lg: {
        'borderRadius': 'lg',

        '&:hover .button_front': {
          transform: variant !== 'text' ? 'translateY(-6px)' : 'none'
        },

        '&:active .button_front': {
          transform: variant !== 'text' ? 'translateY(-2px)' : 'none'
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

        fontWeight: 'semibold',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        lineHeight: 'normal',

        borderStyle: 'solid',

        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
      },
      sm: {
        fontSize: 'xs',

        borderRadius: 'sm',
        borderWidth: variant !== 'text' ? '1px 1px 0' : '0',

        padding: `${theme.space[0.5]} ${theme.space[1]}`,

        transform: variant !== 'text' ? 'translateY(-3px)' : 'none'
      },
      md: {
        fontSize: 'sm',

        borderRadius: 'base',
        borderWidth: variant !== 'text' ? '2px 2px 0' : '0',

        padding: `${theme.space[1]} ${theme.space[2]}`,

        transform: variant !== 'text' ? 'translateY(-4px)' : 'none'
      },
      lg: {
        fontSize: 'md',

        borderRadius: 'lg',
        borderWidth: variant !== 'text' ? '2px 2px 0' : '0',

        padding: `${theme.space[1.5]} ${theme.space[3]}`,

        transform: variant !== 'text' ? 'translateY(-5px)' : 'none'
      }
    },
    disabled: {
      default: {
        cursor: 'not-allowed',

        opacity: isLoading ? 1 : 0.5
      },
      sm: {
        '& .button_front': {
          transform: variant !== 'text' ? 'translateY(-1px) !important' : 'none !important'
        }
      },
      md: {
        '& .button_front': {
          transform: variant !== 'text' ? 'translateY(-2px) !important' : 'none !important'
        }
      },
      lg: {
        '& .button_front': {
          transform: variant !== 'text' ? 'translateY(-2px) !important' : 'none !important'
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

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: `${color}.500`,
            color: 'gray.50'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.700`,

          '& .button_front': {
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

          '& .button_front': {
            borderColor: `${color}.500`,
            backgroundColor: 'gray.50',
            color: `${color}.500`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.700`,

          '& .button_front': {
            borderColor: `${color}.700`,
            backgroundColor: 'gray.50',
            color: `${color}.700`
          }
        },

        '&:focus': {
          outlineColor: `${color}.700`
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
      text: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.500`
      }
    },
    disabled: {
      contained: {
        'background': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
        'backgroundColor': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,

        '& .button_front': {
          borderColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
          backgroundColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
          color: `${theme.colors.gray[50]} !important`
        }
      },
      outlined: {
        'background': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
        'backgroundColor': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,

        '& .button_front': {
          borderColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
          backgroundColor: `${theme.colors.gray[50]} !important`,
          color: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`
        }
      },
      text: {
        'background': 'transparent !important',
        'backgroundColor': 'transparent !important',

        '& .button_front': {
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

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: `${color}.400`,
            color: 'gray.900'
          }
        },

        '&:active': {
          'backgroundColor': `${color}.200`,

          '& .button_front': {
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

          '& .button_front': {
            borderColor: `${color}.400`,
            backgroundColor: 'gray.900',
            color: `${color}.400`
          }
        },

        '&:active': {
          'backgroundColor': `${color}.200`,

          '& .button_front': {
            borderColor: `${color}.200`,
            backgroundColor: 'gray.900',
            color: `${color}.200`
          }
        },

        '&:focus': {
          outlineColor: `${color}.200`
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
            color: `${color}.300`
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
      text: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: `${color}.400`
      }
    },
    disabled: {
      contained: {
        'background': `${theme.colors.gray[400]} !important`,
        'backgroundColor': `${theme.colors.gray[400]} !important`,

        '& .button_front': {
          borderColor: `${theme.colors.gray[400]} !important`,
          backgroundColor: `${theme.colors.gray[400]} !important`,
          color: `${theme.colors.gray[50]} !important`
        }
      },
      outlined: {
        'background': `${theme.colors.gray[400]} !important`,
        'backgroundColor': `${theme.colors.gray[400]} !important`,

        '& .button_front': {
          borderColor: `${theme.colors.gray[400]} !important`,
          backgroundColor: `${theme.colors.gray[50]} !important`,
          color: `${theme.colors.gray[400]} !important`
        }
      },
      text: {
        'background': 'transparent !important',
        'backgroundColor': 'transparent !important',

        '& .button_front': {
          borderColor: 'transparent !important',
          backgroundColor: 'transparent !important',
          color: `${theme.colors.gray[400]} !important`
        }
      }
    }
  }
});
