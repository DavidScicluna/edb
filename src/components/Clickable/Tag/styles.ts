import { TagProps, Variant, Size } from './types';

import { Style } from '../../../common/types';
import { handleIsTouchDevice } from '../../../common/utils';
import { Theme } from '../../../theme/types';

type VariantStyle = { [key in Variant]: Style };

type SizeStyle = { [key in Size]: Style };

type TagDefaultStyle = {
	default: Style;
	disabled: Style;
} & SizeStyle;

type TagStyle = {
	tag: TagDefaultStyle;
	light: VariantStyle;
	dark: VariantStyle;
};

type StyleTagProps = {
	color: TagProps['color'];
	isClickable: TagProps['isClickable'];
	isFullWidth: TagProps['isFullWidth'];
	isDeletable: boolean;
	size: TagProps['size'];
	variant: TagProps['variant'];
};

const isTouchDevice = handleIsTouchDevice();

export default (
	theme: Theme,
	{
		color = 'gray',
		isClickable = false,
		isFullWidth = false,
		isDeletable = false,
		size = 'md',
		variant = 'contained'
	}: StyleTagProps
): TagStyle => ({
	tag: {
		default: {
			'cursor': isClickable ? 'pointer' : 'default',

			'position': 'relative',

			'width': isFullWidth ? '100%' : 'auto',
			'height': 'auto',

			'minWidth': 'auto',
			'minHeight': 'auto',
			'maxWidth': 'none',
			'maxHeight': 'none',

			'overflow': 'hidden',

			'userSelect': 'none',

			'opacity': 1,

			'borderStyle': 'solid',
			'outline': !isTouchDevice ? '0px auto' : 'none !important',

			'WebkitTapHighlightColor': 'transparent',

			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

			'& .tag_children': {
				fontWeight: 'semibold',
				textTransform: 'uppercase',
				whiteSpace: 'nowrap',
				lineHeight: 'normal',
				textOverflow: 'ellipsis',
				overflow: 'hidden'
			},

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
			borderWidth: variant !== 'text' ? '1px' : '0',

			py: theme.space[isDeletable ? 0 : 0.5],
			pl: theme.space[1],
			pr: theme.space[isDeletable ? 0.5 : 1]
		},
		md: {
			fontSize: 'sm',

			borderRadius: 'base',
			borderWidth: variant !== 'text' ? '2px' : '0',

			py: theme.space[isDeletable ? 0 : 1],
			pl: theme.space[2],
			px: theme.space[isDeletable ? 1 : 2]
		},
		lg: {
			fontSize: 'md',

			borderRadius: 'lg',
			borderWidth: variant !== 'text' ? '2px' : '0',

			py: theme.space[isDeletable ? 0.5 : 1.5],
			pl: theme.space[3],
			px: theme.space[isDeletable ? 1.5 : 3]
		},
		disabled: {
			cursor: 'not-allowed',
			pointerEvents: 'none',

			opacity: 0.5
		}
	},
	light: {
		contained: {
			'borderColor': `${color}.${color === 'gray' ? 400 : 500}`,
			'backgroundColor': `${color}.${color === 'gray' ? 400 : 500}`,
			'color': 'gray.50',

			'&:hover': {
				borderColor: `${color}.${isClickable ? (color === 'gray' ? 500 : 600) : color === 'gray' ? 400 : 500}`,
				backgroundColor: `${color}.${
					isClickable ? (color === 'gray' ? 500 : 600) : color === 'gray' ? 400 : 500
				}`,
				color: 'gray.50'
			},

			'&:active': {
				borderColor: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 600 : 700) : color === 'gray' ? 400 : 500]
				} !important`,
				backgroundColor: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 600 : 700) : color === 'gray' ? 400 : 500]
				} !important`,
				color: `${theme.colors.gray[50]} !important`
			},

			'&:focus-visible': {
				outline: !isTouchDevice
					? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 400 : 500]}`
					: 'none',
				outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
			}
		},
		outlined: {
			'borderColor': `${color}.${color === 'gray' ? 400 : 500}`,
			'backgroundColor': 'gray.50',
			'color': `${color}.${color === 'gray' ? 400 : 500}`,

			'&:hover': {
				borderColor: `${color}.${isClickable ? (color === 'gray' ? 500 : 600) : color === 'gray' ? 400 : 500}`,
				backgroundColor: 'gray.50',
				color: `${color}.${isClickable ? (color === 'gray' ? 500 : 600) : color === 'gray' ? 400 : 500}`
			},

			'&:active': {
				borderColor: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 600 : 700) : color === 'gray' ? 400 : 500]
				} !important`,
				backgroundColor: `${theme.colors.gray[50]} !important`,
				color: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 600 : 700) : color === 'gray' ? 400 : 500]
				} !important`
			},

			'&:focus-visible': {
				outline: !isTouchDevice
					? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 400 : 500]}`
					: 'none',
				outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
			}
		},
		text: {
			'borderColor': 'transparent',
			'backgroundColor': 'transparent',
			'color': `${color}.${color === 'gray' ? 400 : 500}`,

			'&:hover': {
				borderColor: 'transparent',
				backgroundColor: 'transparent',
				color: `${color}.${isClickable ? (color === 'gray' ? 500 : 600) : color === 'gray' ? 400 : 500}`
			},

			'&:active': {
				borderColor: 'transparent !important',
				backgroundColor: 'transparent !important',
				color: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 600 : 700) : color === 'gray' ? 400 : 500]
				} !important`
			},

			'&:focus-visible': {
				outline: !isTouchDevice
					? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 400 : 500]}`
					: 'none',
				outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
			}
		}
	},
	dark: {
		contained: {
			'borderColor': `${color}.${color === 'gray' ? 500 : 400}`,
			'backgroundColor': `${color}.${color === 'gray' ? 500 : 400}`,
			'color': 'gray.900',

			'&:hover': {
				borderColor: `${color}.${isClickable ? (color === 'gray' ? 400 : 300) : color === 'gray' ? 500 : 400}`,
				backgroundColor: `${color}.${
					isClickable ? (color === 'gray' ? 400 : 300) : color === 'gray' ? 500 : 400
				}`,
				color: 'gray.900'
			},

			'&:active': {
				borderColor: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 300 : 200) : color === 'gray' ? 500 : 400]
				} !important`,
				backgroundColor: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 300 : 200) : color === 'gray' ? 500 : 400]
				} !important`,
				color: `${theme.colors.gray[900]} !important`
			},

			'&:focus-visible': {
				outline: !isTouchDevice
					? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 500 : 400]}`
					: 'none',
				outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
			}
		},
		outlined: {
			'borderColor': `${color}.${color === 'gray' ? 500 : 400}`,
			'backgroundColor': 'gray.900',
			'color': `${color}.${color === 'gray' ? 500 : 400}`,

			'&:hover': {
				borderColor: `${color}.${isClickable ? (color === 'gray' ? 400 : 300) : color === 'gray' ? 500 : 400}`,
				backgroundColor: 'gray.900',
				color: `${color}.${isClickable ? (color === 'gray' ? 400 : 300) : color === 'gray' ? 500 : 400}`
			},

			'&:active': {
				borderColor: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 300 : 200) : color === 'gray' ? 500 : 400]
				} !important`,
				backgroundColor: `${theme.colors.gray[900]} !important`,
				color: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 300 : 200) : color === 'gray' ? 500 : 400]
				} !important`
			},

			'&:focus-visible': {
				outline: !isTouchDevice
					? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 500 : 400]}`
					: 'none',
				outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
			}
		},
		text: {
			'borderColor': 'transparent',
			'backgroundColor': 'transparent',
			'color': `${color}.${color === 'gray' ? 500 : 400}`,

			'&:hover': {
				borderColor: 'transparent',
				backgroundColor: 'transparent',
				color: `${color}.${isClickable ? (color === 'gray' ? 400 : 300) : color === 'gray' ? 500 : 400}`
			},

			'&:active': {
				borderColor: 'transparent !important',
				backgroundColor: 'transparent !important',
				color: `${
					theme.colors[color][isClickable ? (color === 'gray' ? 300 : 200) : color === 'gray' ? 500 : 400]
				} !important`
			},

			'&:focus-visible': {
				outline: !isTouchDevice
					? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 500 : 400]}`
					: 'none',
				outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
			}
		}
	}
});
