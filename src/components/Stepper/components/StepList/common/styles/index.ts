import { Theme, Style } from '@davidscicluna/component-library';

import { height } from '../..';
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
			'borderBottomColor': 'gray.200',

			'&:hover': {
				backgroundColor: 'gray.100',
				borderBottomColor: 'gray.200'
			},

			'&:active': {
				backgroundColor: 'gray.200',
				borderBottomColor: 'gray.200'
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
				borderBottomColor: 'green.500'
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
				borderBottomColor: 'red.500'
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
				borderBottomColor: 'yellow.500'
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
				borderBottomColor: `${color}.500`
			}
		}
	},
	dark: {
		idle: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': 'gray.700',

			'&:hover': {
				backgroundColor: 'gray.800',
				borderBottomColor: 'gray.700'
			},

			'&:active': {
				backgroundColor: 'gray.700',
				borderBottomColor: 'gray.700'
			}
		},
		success: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': 'green.400',

			'&:hover': {
				backgroundColor: 'gray.800',
				borderBottomColor: 'green.400'
			},

			'&:active': {
				backgroundColor: 'gray.700',
				borderBottomColor: 'green.400'
			}
		},
		error: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': 'red.400',

			'&:hover': {
				backgroundColor: 'gray.800',
				borderBottomColor: 'red.400'
			},

			'&:active': {
				backgroundColor: 'gray.700',
				borderBottomColor: 'red.400'
			}
		},
		warning: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': 'yellow.400',

			'&:hover': {
				backgroundColor: 'gray.800',
				borderBottomColor: 'yellow.400'
			},

			'&:active': {
				backgroundColor: 'gray.700',
				borderBottomColor: 'yellow.400'
			}
		},
		active: {
			'backgroundColor': 'gray.900',
			'borderBottomColor': `${color}.400`,

			'&:hover': {
				backgroundColor: 'gray.800',
				borderBottomColor: `${color}.400`
			},

			'&:active': {
				backgroundColor: 'gray.700',
				borderBottomColor: `${color}.400`
			}
		}
	}
});
