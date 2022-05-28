import { Theme, Style } from '@davidscicluna/component-library';

import { Theme as UserTheme } from '../../../../store/slices/Users/types';

type NavItemChildStyle = {
	common: {
		child: Style;
		link: Style;
	};
	light: {
		child: Style;
	};
	dark: {
		child: Style;
	};
};

export default (
	theme: Theme,
	color: UserTheme['color'],
	isActive = false,
	isExpanded = false,
	isLastChild = false
): NavItemChildStyle => ({
	common: {
		child: {
			'cursor': 'pointer',

			'backgroundColor': 'transparent',
			'borderRadius': isExpanded ? 'base' : isLastChild ? `0 0 ${theme.radii.base} ${theme.radii.base}` : 'none',

			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

			'& .chakra-text': {
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
			}
		},
		link: {
			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

			'&:hover': {
				textDecoration: 'none'
			},
			'&:focus': {
				boxShadow: 'none'
			}
		}
	},
	light: {
		child: {
			'backgroundColor': isActive ? `${color}.400` : 'transparent',

			'& .chakra-text': {
				color: isActive ? 'gray.50' : 'gray.400'
			},

			'&:hover': {
				'backgroundColor': isActive ? `${color}.500` : 'gray.200',

				'& .chakra-text': {
					color: isActive ? 'gray.50' : 'gray.900'
				}
			}
		}
	},
	dark: {
		child: {
			'backgroundColor': isActive ? `${color}.500` : 'transparent',

			'& .chakra-text': {
				color: isActive ? 'gray.900' : 'gray.500'
			},

			'&:hover': {
				'backgroundColor': isActive ? `${color}.400` : 'gray.700',

				'& .chakra-text': {
					color: isActive ? 'gray.900' : 'gray.50'
				}
			}
		}
	}
});
