import { CardProps } from './types';

import { Style } from '../../../common/types';
import { Theme } from '../../../theme/types';

type CommonStyle = {
	back: Style;
	front: Style;
	disabled: Style;
};

type CardStyle = {
	card: CommonStyle;
	light: CommonStyle;
	dark: CommonStyle;
};

type StyleCardProps = {
	color: CardProps['color'];
	isFullWidth: CardProps['isFullWidth'];
	isLight: CardProps['isLight'];
	isFixed: CardProps['isFixed'];
	isClickable: CardProps['isClickable'];
};

export default (
	theme: Theme,
	{ color = 'gray', isFullWidth = false, isLight = false, isFixed = false, isClickable = false }: StyleCardProps
): CardStyle => ({
	card: {
		back: {
			'cursor': isClickable ? 'pointer' : 'default',

			'width': isFullWidth ? '100%' : 'auto',
			'height': 'auto',

			'minWidth': 'auto',
			'minHeight': 'auto',
			'maxWidth': 'none',
			'maxHeight': 'none',

			'userSelect': 'none',

			'opacity': 1,

			'border': 'none',
			'borderRadius': 'lg',

			'outline': '0px auto',

			'padding': 0,

			'marginTop': isFixed || isClickable ? '5px' : 0,

			'WebkitTapHighlightColor': 'transparent',

			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

			'&:hover .card_front': {
				transform: `translateY(${isClickable ? '-5px' : '-2px'})`
			},

			'&:active .card_front': {
				transform: isFixed
					? `translateY(${isClickable ? '-5px' : '-2px'})`
					: isClickable
					? 'translateY(-2px)'
					: 'none'
			},

			'&:focus:not(:focus-visible)': {
				outline: '0px auto'
			},

			'&:focus': {
				boxShadow: 'none',
				outline: '0px auto'
			},

			'&:active': {
				outline: '0px auto'
			},

			'& svg': {
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
			}
		},
		front: {
			cursor: 'inherit',

			position: 'relative',

			width: '100%',
			height: '100%',

			display: 'flex',
			flexWrap: 'nowrap',
			alignItems: 'center',
			justifyContent: 'center',

			userSelect: 'none',
			willChange: 'auto',

			borderStyle: 'solid',
			borderWidth: '2px 2px 0',
			borderRadius: 'lg',

			transform: `translateY(${isClickable ? '-5px' : '-2px'})`,

			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
		},
		disabled: {
			'cursor': 'not-allowed',
			'pointerEvents': 'none',

			'opacity': 0.5,

			'marginTop': 0,

			'& .card_front': {
				transform: 'translateY(-2px) !important'
			}
		}
	},
	light: {
		back: {
			'backgroundColor': `${color}.${isLight ? 200 : 400}`,

			'&:hover': {
				'backgroundColor': `${color}.${isLight ? 200 : 400}`,

				'& .card_front': {
					borderColor: `${color}.${isLight ? 200 : 400}`,
					backgroundColor: 'gray.50',
					color: `${color}.${isLight ? 200 : 400}`
				}
			},

			'&:active': {
				'backgroundColor':
					!isFixed && isClickable ? `${color}.${isLight ? 300 : 500}` : `${color}.${isLight ? 200 : 400}`,

				'& .card_front': {
					borderColor:
						!isFixed && isClickable ? `${color}.${isLight ? 300 : 500}` : `${color}.${isLight ? 200 : 400}`,
					backgroundColor: 'gray.50',
					color:
						!isFixed && isClickable ? `${color}.${isLight ? 300 : 500}` : `${color}.${isLight ? 200 : 400}`
				}
			},

			'&:focus-visible': {
				outline: `2px auto ${theme.colors[color][400]}`,
				outlineOffset: '6px'
			}
		},
		front: {
			borderColor: `${color}.${isLight ? 200 : 400}`,
			backgroundColor: 'gray.50',
			color: `${color}.${isLight ? 200 : 400}`
		},
		disabled: {
			'background': `${theme.colors.gray[isLight ? 200 : 400]} !important`,
			'backgroundColor': `${theme.colors.gray[isLight ? 200 : 400]} !important`,

			'& .card_front': {
				borderColor: `${theme.colors.gray[isLight ? 200 : 400]} !important`,
				backgroundColor: `${theme.colors.gray[50]} !important`,
				color: `${theme.colors.gray[isLight ? 200 : 400]} !important`
			}
		}
	},
	dark: {
		back: {
			'backgroundColor': `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`,

			'&:hover': {
				'backgroundColor': `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`,

				'& .card_front': {
					borderColor: `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`,
					backgroundColor: 'gray.900',
					color: `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`
				}
			},

			'&:active': {
				'backgroundColor':
					!isFixed && isClickable
						? `${color}.${isLight ? 600 : color === 'gray' ? 400 : 500}`
						: `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`,

				'& .card_front': {
					borderColor:
						!isFixed && isClickable
							? `${color}.${isLight ? 600 : color === 'gray' ? 400 : 500}`
							: `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`,
					backgroundColor: 'gray.900',
					color:
						!isFixed && isClickable
							? `${color}.${isLight ? 600 : color === 'gray' ? 400 : 500}`
							: `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`
				}
			},

			'&:focus-visible': {
				outline: `2px auto ${theme.colors[color][400]}`,
				outlineOffset: '6px'
			}
		},
		front: {
			borderColor: `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`,
			backgroundColor: 'gray.900',
			color: `${color}.${isLight ? 700 : color === 'gray' ? 500 : 400}`
		},
		disabled: {
			'background': `${theme.colors.gray[isLight ? 700 : 500]} !important`,
			'backgroundColor': `${theme.colors.gray[isLight ? 700 : 500]} !important`,

			'& .card_front': {
				borderColor: `${theme.colors.gray[isLight ? 700 : 500]} !important`,
				backgroundColor: `${theme.colors.gray[900]} !important`,
				color: `${theme.colors.gray[isLight ? 700 : 500]} !important`
			}
		}
	}
});
