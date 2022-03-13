import { InputProps, Size } from './types';

import { Style } from '../../../common/types';
import { Theme } from '../../../theme/types';

type SizeStyle = { [key in Size]: Style };

type InvalidStyle = { invalid: Style };

type DefaultStyle = { default: Style };

type InputStyle = {
	group: DefaultStyle & SizeStyle;
	input: DefaultStyle & SizeStyle;
	formLabel: DefaultStyle & SizeStyle;
	formHelperText: DefaultStyle & SizeStyle;
	light: {
		group: DefaultStyle & InvalidStyle;
		formLabel: DefaultStyle & InvalidStyle;
		formHelperText: Style;
	};
	dark: {
		group: DefaultStyle & InvalidStyle;
		formLabel: DefaultStyle & InvalidStyle;
		formHelperText: Style;
	};
};

type StyleInputProps = {
	color: InputProps['color'];
	isDisabled: InputProps['isDisabled'];
	isFullWidth: InputProps['isFullWidth'];
};

export default (
	theme: Theme,
	{ color = 'gray', isDisabled = false, isFullWidth = false }: StyleInputProps
): InputStyle => ({
	group: {
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

			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

			'&:focus': {
				boxShadow: 'none'
			},

			'& .edb-icon': {
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
			}
		},
		sm: {
			fontSize: 'sm',

			borderRadius: 'sm',

			padding: theme.space[1]
		},
		md: {
			fontSize: 'md',

			borderRadius: 'base',

			padding: `${theme.space[1.5]} ${theme.space[2]}`
		},
		lg: {
			fontSize: 'lg',

			borderRadius: 'lg',

			padding: theme.space[2]
		}
	},
	input: {
		default: {
			'cursor': isDisabled ? 'not-allowed' : 'text',

			'borderRadius': 'none',

			'fontWeight': 'normal',
			'textTransform': 'none',
			'whiteSpace': 'nowrap',
			'lineHeight': 'normal',

			'padding': 0,

			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

			'&:focus': {
				boxShadow: 'none'
			},

			'& .edb-icon': {
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
			}
		},
		sm: {
			fontSize: 'sm'
		},
		md: {
			fontSize: 'md'
		},
		lg: {
			fontSize: 'lg'
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

			m: 0,

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
		group: {
			default: {
				'borderColor': 'gray.200',
				'backgroundColor': 'transparent',
				'color': 'gray.400',

				'&:hover': {
					borderColor: isDisabled ? 'gray.200' : `${color}.500`,
					backgroundColor: 'transparent',
					color: isDisabled ? 'gray.400' : `${color}.500`
				},

				'&:focus': {
					borderColor: isDisabled ? 'gray.200' : `${color}.500`,
					backgroundColor: 'transparent',
					color: isDisabled ? 'gray.400' : `${color}.500`
				}
			},
			invalid: {
				'borderColor': isDisabled ? 'gray.200' : 'red.500',
				'backgroundColor': 'transparent',
				'color': isDisabled ? 'gray.400' : 'red.500',

				'&:hover': {
					borderColor: isDisabled ? 'gray.200' : 'red.500',
					backgroundColor: 'transparent',
					color: isDisabled ? 'gray.400' : 'red.600'
				},

				'&:focus': {
					borderColor: isDisabled ? 'gray.200' : 'red.600',
					backgroundColor: 'transparent',
					color: isDisabled ? 'gray.400' : 'red.600'
				}
			}
		},
		formLabel: {
			default: {
				color: `gray.${isDisabled ? 400 : 900}`
			},
			invalid: {
				color: 'red.500'
			}
		},
		formHelperText: {
			color: 'red.500'
		}
	},
	dark: {
		group: {
			default: {
				'borderColor': 'gray.700',
				'backgroundColor': 'transparent',
				'color': 'gray.500',

				'&:hover': {
					borderColor: isDisabled ? 'gray.700' : `${color}.400`,
					backgroundColor: 'transparent',
					color: isDisabled ? 'gray.500' : `${color}.400`
				},

				'&:focus': {
					borderColor: isDisabled ? 'gray.700' : `${color}.400`,
					backgroundColor: 'transparent',
					color: isDisabled ? 'gray.500' : `${color}.400`
				}
			},
			invalid: {
				'borderColor': isDisabled ? 'gray.700' : 'red.400',
				'backgroundColor': 'transparent',
				'color': isDisabled ? 'gray.500' : 'red.400',

				'&:hover': {
					borderColor: isDisabled ? 'gray.700' : 'red.300',
					backgroundColor: 'transparent',
					color: isDisabled ? 'gray.500' : 'red.300'
				},

				'&:focus': {
					borderColor: isDisabled ? 'gray.700' : 'red.300',
					backgroundColor: 'transparent',
					color: isDisabled ? 'gray.500' : 'red.300'
				}
			}
		},
		formLabel: {
			default: {
				color: `gray.${isDisabled ? 500 : 50}`
			},
			invalid: {
				color: 'red.400'
			}
		},
		formHelperText: {
			color: 'red.400'
		}
	}
});
