import { height } from '../..';
import { Style } from '../../../../../../common/types';
import { Theme } from '../../../../../../theme/types';
import { StepProps, Status } from '../../components/Step/types';

type StatusStyle = { [key in Status]: Style };

type TabStyle = {
	step: Style;
	disabled: Style;
	light: StatusStyle;
	dark: StatusStyle;
};

type StyleTabsProps = {
	color: StepProps['color'];
};

export default (theme: Theme, { color }: StyleTabsProps): TabStyle => ({
	step: {
		'cursor': 'pointer',

		'height': height,

		'userSelect': 'none',
		'willChange': 'auto',

		'opacity': 1,

		'borderRadius': 'none',
		'borderBottomWidth': '2px',
		'borderBottomStyle': 'solid',

		'WebkitTapHighlightColor': 'transparent',

		'px': 2,
		'py': 1,

		'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

		'&:focus': {
			boxShadow: 'none'
		},

		'& .edb-icon': {
			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
		}
	},
	disabled: {
		cursor: 'not-allowed',
		pointerEvents: 'none',

		opacity: 0.5
	},
	light: {
		idle: {
			'backgroundColor': 'gray.50',
			'borderBottomColor': 'grey.200',

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: 'grey.300'
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: 'grey.400'
			}
		},
		success: {
			'backgroundColor': 'gray.50',
			'borderBottomColor': 'green.500',

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: 'green.500'
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: 'green.600'
			}
		},
		error: {
			'backgroundColor': 'gray.50',
			'borderBottomColor': 'red.500',

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: 'red.500'
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: 'red.600'
			}
		},
		warning: {
			'backgroundColor': 'gray.50',
			'borderBottomColor': 'yellow.500',

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: 'yellow.500'
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: 'yellow.600'
			}
		},
		active: {
			'backgroundColor': 'gray.50',
			'borderBottomColor': `${color}.500`,

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: `${color}.500`
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: `${color}.600`
			}
		}
	},
	dark: {
		idle: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': 'grey.700',

			'&:hover': {
				backgroundColor: 'gray.800',
				borderBottomColor: 'grey.600'
			},

			'&:active': {
				backgroundColor: 'gray.700',
				borderBottomColor: 'grey.500'
			}
		},
		success: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': 'green.400',

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: 'green.400'
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: 'green.300'
			}
		},
		error: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': 'red.400',

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: 'red.400'
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: 'red.300'
			}
		},
		warning: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': 'yellow.400',

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: 'yellow.400'
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: 'yellow.300'
			}
		},
		active: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': `${color}.400`,

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: `${color}.400`
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: `${color}.300`
			}
		}
	}
});
