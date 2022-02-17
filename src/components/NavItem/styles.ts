import { Style } from '../../common/types';
import { Theme, Color } from '../../theme/types';

type NavItemStyle = {
	common: {
		container: Style;
		main: Style;
		link: Style;
	};
	light: {
		container: Style;
		main: Style;
	};
	dark: {
		container: Style;
		main: Style;
	};
};

type StyleNavItemProps = {
	color: keyof Color;
	isActive: boolean;
	isChildActive: boolean;
	renderChildren: boolean;
	isExpanded: boolean;
	isOpen: boolean;
};

export default (
	theme: Theme,
	{
		color,
		isActive = false,
		isChildActive = false,
		renderChildren = false,
		isExpanded = false,
		isOpen = false
	}: StyleNavItemProps
): NavItemStyle => ({
	common: {
		container: {
			borderRadius: 'base',

			transition: `${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`
		},
		main: {
			'cursor': 'pointer',

			'borderRadius':
				!isExpanded && isOpen && renderChildren ? `${theme.radii.base} ${theme.radii.base} 0 0` : 'base',

			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

			'& .chakra-text': {
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
			},

			'& svg': {
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
			}
		},
		link: {
			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		}
	},
	light: {
		container: {
			backgroundColor: !isExpanded && isOpen && renderChildren ? 'gray.200' : 'transparent'
		},
		main: {
			'backgroundColor': isChildActive ? 'transparent' : isActive ? `${color}.400` : 'transparent',

			'& .chakra-text': {
				color: isChildActive ? `${color}.400` : isActive ? 'gray.50' : 'gray.400'
			},

			'& svg': {
				color: isChildActive ? `${color}.400` : isActive ? 'gray.50' : 'gray.400'
			},

			'&:hover': {
				'backgroundColor': isChildActive ? 'gray.200' : isActive ? `${color}.500` : 'gray.200',

				'& .chakra-text': {
					color: isChildActive ? `${color}.500` : isActive ? 'gray.50' : 'gray.900'
				},

				'& svg': {
					color: isChildActive ? `${color}.500` : isActive ? 'gray.50' : 'gray.900'
				}
			}
		}
	},
	dark: {
		container: {
			backgroundColor: !isExpanded && isOpen && renderChildren ? 'gray.700' : 'transparent'
		},
		main: {
			'backgroundColor': isChildActive ? 'transparent' : isActive ? `${color}.500` : 'transparent',

			'& .chakra-text': {
				color: isChildActive ? `${color}.500` : isActive ? 'gray.900' : 'gray.400'
			},

			'& svg': {
				color: isChildActive ? `${color}.500` : isActive ? 'gray.900' : 'gray.400'
			},

			'&:hover': {
				'backgroundColor': isChildActive ? 'gray.700' : isActive ? `${color}.400` : 'gray.700',

				'& .chakra-text': {
					color: isChildActive ? `${color}.400` : isActive ? 'gray.900' : 'gray.50'
				},

				'& svg': {
					color: isChildActive ? `${color}.400` : isActive ? 'gray.900' : 'gray.50'
				}
			}
		}
	}
});
