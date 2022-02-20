import { PanelProps, Variant } from './types';

import { Style } from '../../common/types';
import { Theme } from '../../theme/types';

type VariantStyle = { [key in Variant]: Style };

type PanelStyle = {
	panel: VariantStyle;
	light: VariantStyle;
	dark: VariantStyle;
};

type StylePanelProps = {
	color: PanelProps['color'];
	isFullWidth: PanelProps['isFullWidth'];
};

export default (theme: Theme, { color = 'gray', isFullWidth = false }: StylePanelProps): PanelStyle => ({
	panel: {
		outlined: {
			width: isFullWidth ? '100%' : 'auto',
			height: 'auto',

			borderStyle: 'solid',
			borderWidth: '2px',
			borderRadius: 'lg',

			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		},
		transparent: {
			width: isFullWidth ? '100%' : 'auto',
			height: 'auto',

			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		}
	},
	light: {
		outlined: {
			'backgroundColor': 'transparent',
			'borderColor': color === 'gray' ? 'gray.200' : `${color}.400`,

			'&:hover': {
				backgroundColor: 'transparent',
				borderColor: color === 'gray' ? 'gray.200' : `${color}.400`
			},

			'&:active': {
				backgroundColor: 'transparent',
				borderColor: color === 'gray' ? 'gray.200' : `${color}.400`
			}
		},
		transparent: {
			'backgroundColor': 'transparent',

			'&:hover': {
				backgroundColor: 'transparent'
			},

			'&:active': {
				backgroundColor: 'transparent'
			}
		}
	},
	dark: {
		outlined: {
			'backgroundColor': 'transparent',
			'borderColor': color === 'gray' ? 'gray.700' : `${color}.500`,

			'&:hover': {
				backgroundColor: 'transparent',
				borderColor: color === 'gray' ? 'gray.700' : `${color}.500`
			},

			'&:active': {
				backgroundColor: 'transparent',
				borderColor: color === 'gray' ? 'gray.700' : `${color}.500`
			}
		},
		transparent: {
			'backgroundColor': 'transparent',

			'&:hover': {
				backgroundColor: 'transparent'
			},

			'&:active': {
				backgroundColor: 'transparent'
			}
		}
	}
});
