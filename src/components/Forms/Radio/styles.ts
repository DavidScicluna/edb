import { RadioProps } from './types';

import { Style } from '../../../common/types';
import { Theme } from '../../../theme/types';

type RadioStyle = {
	radio: Style;
	light: Style;
	dark: Style;
};

type StyleRadioProps = {
	color: RadioProps['color'];
	isChecked: RadioProps['isChecked'];
	isDisabled: RadioProps['isDisabled'];
};

export default (
	theme: Theme,
	{ color = 'gray', isChecked = false, isDisabled = false }: StyleRadioProps
): RadioStyle => ({
	radio: {
		'opacity': isDisabled ? 0.5 : 1,

		'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

		'&:focus': {
			boxShadow: 'none !important'
		},

		'&.chakra-radio__control': {
			width: theme.space[3],
			height: theme.space[3],

			boxShadow: 'none !important',
			background: isChecked ? `${color}.400` : 'transparent',

			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		},

		'& .edb-icon': {
			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		}
	},
	light: {
		'&.chakra-radio__control': {
			background: isChecked ? `${color}.400` : 'transparent',
			borderColor: isChecked ? `${color}.400` : 'gray.400',
			color: isChecked ? 'gray.50' : 'transparent'
		},

		'&:hover': {
			'&.chakra-radio__control': {
				background: isChecked ? `${color}.500` : 'transparent',
				borderColor: isChecked ? `${color}.500` : 'gray.500',
				color: isChecked ? 'gray.50' : 'transparent'
			}
		}
	},
	dark: {
		'&.chakra-radio__control': {
			background: isChecked ? `${color}.500` : 'transparent',
			borderColor: isChecked ? `${color}.500` : 'gray.500',
			color: isChecked ? 'gray.900' : 'transparent'
		},

		'&:hover': {
			'&.chakra-radio__control': {
				background: isChecked ? `${color}.400` : 'transparent',
				borderColor: isChecked ? `${color}.400` : 'gray.400',
				color: isChecked ? 'gray.900' : 'transparent'
			}
		}
	}
});
