import { CheckboxProps } from './types';

import { Style } from '../../../common/types';
import { Theme } from '../../../theme/types';

type CheckboxStyle = {
	checkbox: Style;
	light: Style;
	dark: Style;
};

type StyleCheckboxProps = {
	color: CheckboxProps['color'];
	isChecked: CheckboxProps['isChecked'];
	isDisabled: CheckboxProps['isDisabled'];
};

export default (
	theme: Theme,
	{ color = 'gray', isChecked = false, isDisabled = false }: StyleCheckboxProps
): CheckboxStyle => ({
	checkbox: {
		'opacity': isDisabled ? 0.5 : 1,

		'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

		'&:focus': {
			boxShadow: 'none !important'
		},

		'& .chakra-checkbox__control': {
			width: theme.fontSizes['xl'],
			height: theme.fontSizes['xl'],

			boxShadow: 'none !important',

			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		},

		'& .edb-icon': {
			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		}
	},
	light: {
		'& .chakra-checkbox__control': {
			background: isChecked ? `${color}.500` : 'transparent',
			borderColor: isChecked ? `${color}.500` : 'gray.400',
			color: isChecked ? 'gray.50' : 'transparent'
		},

		'&:hover': {
			'& .chakra-checkbox__control': {
				background: isChecked ? `${color}.600` : 'transparent',
				borderColor: isChecked ? `${color}.600` : 'gray.500',
				color: isChecked ? 'gray.50' : 'transparent'
			}
		}
	},
	dark: {
		'& .chakra-checkbox__control': {
			background: isChecked ? `${color}.400` : 'transparent',
			borderColor: isChecked ? `${color}.400` : 'gray.500',
			color: isChecked ? 'gray.900' : 'transparent'
		},

		'&:hover': {
			'& .chakra-checkbox__control': {
				background: isChecked ? `${color}.300` : 'transparent',
				borderColor: isChecked ? `${color}.300` : 'gray.400',
				color: isChecked ? 'gray.900' : 'transparent'
			}
		}
	}
});
