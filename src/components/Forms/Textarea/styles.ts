import { Style } from '../../../common/types';
import { Theme } from '../../../theme/types';
import { TextareaProps, Size } from './types';

type SizeStyle = { [key in Size]: Style };

type InvalidStyle = { invalid: Style };

type DefaultStyle = { default: Style };

type TextareaStyle = {
  textarea: DefaultStyle & SizeStyle;
  formLabel: DefaultStyle & SizeStyle;
  formHelperText: DefaultStyle & SizeStyle;
  light: {
    textarea: DefaultStyle & InvalidStyle;
    formLabel: DefaultStyle & InvalidStyle;
    formHelperText: Style;
  };
  dark: {
    textarea: DefaultStyle & InvalidStyle;
    formLabel: DefaultStyle & InvalidStyle;
    formHelperText: Style;
  };
};

type StyleTextareaProps = {
  color: TextareaProps['color'];
  isDisabled: TextareaProps['isDisabled'];
  isFullWidth: TextareaProps['isFullWidth'];
};

export default (
  theme: Theme,
  { color = 'gray', isDisabled = false, isFullWidth = false }: StyleTextareaProps
): TextareaStyle => ({
  textarea: {
    default: {
      'cursor': isDisabled ? 'not-allowed' : 'text',

      'width': isFullWidth ? '100%' : 'auto',
      'height': 'auto',

      'minWidth': 'auto',
      'minHeight': 'auto',
      'maxWidth': 'none',
      'maxHeight': 'none',

      'opacity': isDisabled ? 0.5 : 1,

      'borderStyle': 'solid',
      'borderWidth': '2px',

      // 'outline': 'none',
      // 'outlineWidth': '0px',
      // 'outlineStyle': 'dashed',

      'fontWeight': 'normal',
      'textTransform': 'normal',
      'lineHeight': 'normal',

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

      '&:focus': {
        boxShadow: 'none'
      },

      '& svg': {
        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
      }
    },
    sm: {
      fontSize: 'sm',

      borderRadius: 'sm',

      padding: theme.space[1]

      // '&:focus': {
      //   outlineOffset: '4px'
      // }
    },
    md: {
      fontSize: 'md',

      borderRadius: 'base',

      padding: `${theme.space[1.5]} ${theme.space[2]}`

      // '&:focus': {
      //   outlineOffset: '5px'
      // }
    },
    lg: {
      fontSize: 'lg',

      borderRadius: 'lg',

      padding: theme.space[2]

      // '&:focus': {
      //   outlineOffset: '6px'
      // }
    }
  },
  formLabel: {
    default: {
      opacity: isDisabled ? 0.5 : 1,

      fontWeight: 'medium',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      lineHeight: 'normal',

      margin: 0,

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
    },
    sm: {
      fontSize: 'xs',

      pb: theme.space[0.5]
    },
    md: {
      fontSize: 'sm',

      pb: theme.space[0.75]
    },
    lg: {
      fontSize: 'md',

      pb: theme.space[1]
    }
  },
  formHelperText: {
    default: {
      opacity: isDisabled ? 0.5 : 1,

      fontWeight: 'medium',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      lineHeight: 'normal',

      transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
    },
    sm: {
      fontSize: 'xs',

      pt: theme.space[0.5]
    },
    md: {
      fontSize: 'sm',

      pt: theme.space[0.75]
    },
    lg: {
      fontSize: 'md',

      pt: theme.space[1]
    }
  },
  light: {
    textarea: {
      default: {
        'borderColor': 'gray.200',
        'backgroundColor': 'transparent',
        'color': 'gray.400',

        '&:hover': {
          borderColor: isDisabled ? 'gray.200' : `${color}.400`,
          backgroundColor: 'transparent',
          color: isDisabled ? 'gray.400' : `${color}.400`
        },

        '&:focus': {
          borderColor: isDisabled ? 'gray.200' : `${color}.400`,
          backgroundColor: 'transparent',
          color: isDisabled ? 'gray.400' : `${color}.400`
        }
      },
      invalid: {
        'borderColor': isDisabled ? 'gray.200' : 'red.400',
        'backgroundColor': 'transparent',
        'color': isDisabled ? 'gray.400' : 'red.400',

        '&:hover': {
          borderColor: isDisabled ? 'gray.200' : 'red.400',
          backgroundColor: 'transparent',
          color: isDisabled ? 'gray.400' : 'red.400'
        },

        '&:focus': {
          borderColor: isDisabled ? 'gray.200' : 'red.400',
          backgroundColor: 'transparent',
          color: isDisabled ? 'gray.400' : 'red.400'
        }
      }
    },
    formLabel: {
      default: {
        color: `gray.${isDisabled ? 400 : 900}`
      },
      invalid: {
        color: 'red.400'
      }
    },
    formHelperText: {
      color: 'red.400'
    }
  },
  dark: {
    textarea: {
      default: {
        'borderColor': 'gray.700',
        'backgroundColor': 'transparent',
        'color': 'gray.500',

        '&:hover': {
          borderColor: isDisabled ? 'gray.700' : `${color}.500`,
          backgroundColor: 'transparent',
          color: isDisabled ? 'gray.500' : `${color}.500`
        },

        '&:focus': {
          borderColor: isDisabled ? 'gray.700' : `${color}.500`,
          backgroundColor: 'transparent',
          color: isDisabled ? 'gray.500' : `${color}.500`
        }
      },
      invalid: {
        'borderColor': isDisabled ? 'gray.700' : 'red.500',
        'backgroundColor': 'transparent',
        'color': isDisabled ? 'gray.500' : 'red.500',

        '&:hover': {
          borderColor: isDisabled ? 'gray.700' : 'red.500',
          backgroundColor: 'transparent',
          color: isDisabled ? 'gray.500' : 'red.500'
        },

        '&:focus': {
          borderColor: isDisabled ? 'gray.700' : 'red.500',
          backgroundColor: 'transparent',
          color: isDisabled ? 'gray.500' : 'red.500'
        }
      }
    },
    formLabel: {
      default: {
        color: `gray.${isDisabled ? 500 : 50}`
      },
      invalid: {
        color: 'red.500'
      }
    },
    formHelperText: {
      color: 'red.500'
    }
  }
});
