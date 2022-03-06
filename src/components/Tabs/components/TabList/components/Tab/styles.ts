import { TabsProps, Size } from './types';

import { Style } from '../../../../../../common/types';
import { handleIsTouchDevice } from '../../../../../../common/utils';
import { Theme } from '../../../../../../theme/types';

type SizeStyle = { [key in Size]: Style };

type DefaultStyle = { default: Style };

export type TabStyle = {
	tab: DefaultStyle & SizeStyle;
	disabled: Style;
	light: Style;
	dark: Style;
};

type StyleTabsProps = {
	color: TabsProps['color'];
	isFullWidth: TabsProps['isFullWidth'];
	isOnlyTab: TabsProps['isOnlyTab'];
	isSelected: TabsProps['isSelected'];
	size: TabsProps['size'];
};

const isTouchDevice: boolean = handleIsTouchDevice();

export default (
	theme: Theme,
	{ color = 'gray', isFullWidth = false, isOnlyTab = false, isSelected = false, size = 'md' }: StyleTabsProps
): TabStyle => ({
	tab: {
		default: {
			'cursor': !isOnlyTab ? 'pointer' : 'default',

			'width': isFullWidth ? '100%' : 'auto',
			'height': '100%',

			'userSelect': 'none',
			'willChange': 'auto',

			'display': 'flex',
			'flexWrap': 'nowrap',
			'alignItems': 'center',
			'justifyContent': 'center',

			'fontWeight': 'semibold',
			'textTransform': 'uppercase',
			'whiteSpace': 'nowrap',
			'lineHeight': 'normal',

			'opacity': 1,

			'outline': !isTouchDevice ? '0px auto' : 'none !important',
			'borderStyle': 'solid',

			'WebkitTapHighlightColor': 'transparent',

			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

			'&:focus:not(:focus-visible)': {
				outline: !isTouchDevice ? '0px auto' : 'none !important'
			},

			'&:focus': {
				boxShadow: 'none',
				outline: !isTouchDevice ? '0px auto' : 'none !important'
			},

			'&:active': {
				outline: !isTouchDevice ? '0px auto' : 'none !important'
			},

			'& .edb-icon': {
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
			}
		},
		sm: {
			fontSize: 'xs',

			borderRadius: 'sm',
			borderWidth: '1px',

			padding: !isOnlyTab ? `${theme.space[0.5]} ${theme.space[1]}` : 0
		},
		md: {
			fontSize: 'sm',

			borderRadius: 'base',
			borderWidth: '2px',

			padding: !isOnlyTab ? `${theme.space[1]} ${theme.space[2]}` : 0
		},
		lg: {
			fontSize: 'md',

			borderRadius: 'lg',
			borderWidth: '2px',

			padding: !isOnlyTab ? `${theme.space[1.5]} ${theme.space[3]}` : 0
		}
	},
	disabled: {
		cursor: 'not-allowed',
		pointerEvents: 'none',

		opacity: 0.5
	},
	light: {
		'color': isSelected ? 'gray.50' : 'gray.400',
		'borderColor': isSelected ? `${color}.${color === 'gray' ? 400 : 500}` : 'transparent',
		'backgroundColor': isSelected ? `${color}.${color === 'gray' ? 400 : 500}` : 'transparent',

		'& .edb-icon': {
			color: isSelected ? 'gray.50' : 'gray.400'
		},

		'&:hover': {
			'color': isSelected ? 'gray.50' : `gray.${isOnlyTab ? 400 : 500}`,
			'borderColor': isSelected ? `${color}.${color === 'gray' ? 500 : 600}` : 'transparent',
			'backgroundColor': isSelected ? `${color}.${color === 'gray' ? 500 : 600}` : 'transparent',

			'& .edb-icon': {
				color: isSelected ? 'gray.50' : 'gray.500'
			}
		},

		'&:focus-visible': {
			outline: !isTouchDevice
				? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 400 : 500]}`
				: 'none',
			outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
		}
	},
	dark: {
		'color': isSelected ? 'gray.900' : 'gray.500',
		'borderColor': isSelected ? `${color}.${color === 'gray' ? 500 : 400}` : 'transparent',
		'backgroundColor': isSelected ? `${color}.${color === 'gray' ? 500 : 400}` : 'transparent',

		'& .edb-icon': {
			color: isSelected ? 'gray.900' : 'gray.500'
		},

		'&:hover': {
			'color': isSelected ? 'gray.900' : `gray.${isOnlyTab ? 500 : 400}`,
			'borderColor': isSelected ? `${color}.${color === 'gray' ? 400 : 300}` : 'transparent',
			'backgroundColor': isSelected ? `${color}.${color === 'gray' ? 400 : 300}` : 'transparent',

			'& .edb-icon': {
				color: isSelected ? 'gray.900' : 'gray.400'
			}
		},

		'&:focus-visible': {
			outline: !isTouchDevice
				? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 500 : 400]}`
				: 'none',
			outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
		}
	}
});
