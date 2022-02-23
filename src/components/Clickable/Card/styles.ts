import { CardProps } from './types';

import { Style } from '../../../common/types';
import { handleIsTouchDevice } from '../../../common/utils';
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

const isTouchDevice = handleIsTouchDevice();

export default (
	theme: Theme,
	{ color = 'gray', isFullWidth = false, isLight = false, isFixed = false, isClickable = false }: StyleCardProps
): CardStyle => ({
	card: {
		back: {
			'cursor': !isFixed && isClickable ? 'pointer' : 'default',

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

			'outline': !isTouchDevice ? '0px auto' : 'none !important',

			'padding': 0,

			'marginTop': isFixed || isClickable ? '5px !important' : 0,

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
				outline: !isTouchDevice ? '0px auto' : 'none !important'
			},

			'&:focus': {
				boxShadow: 'none',
				outline: !isTouchDevice ? '0px auto' : 'none !important'
			},

			'&:active': {
				outline: !isTouchDevice ? '0px auto' : 'none !important'
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
			'backgroundColor': `${color}.${isLight ? 200 : 500}`,

			'&:hover': {
				'backgroundColor': `${color}.${isLight ? 200 : 500}`,

				'& .card_front': {
					borderColor: `${color}.${isLight ? 200 : 500}`,
					backgroundColor: 'gray.50',
					color: `${color}.${isLight ? 200 : 500}`
				}
			},

			'&:active': {
				'backgroundColor': `${color}.${!isFixed && isClickable ? (isLight ? 300 : 600) : isLight ? 200 : 500}`,

				'& .card_front': {
					borderColor: `${color}.${!isFixed && isClickable ? (isLight ? 300 : 600) : isLight ? 200 : 500}`,
					backgroundColor: 'gray.50',
					color: `${color}.${!isFixed && isClickable ? (isLight ? 300 : 600) : isLight ? 200 : 500}`
				}
			},

			'&:focus-visible': {
				outline: !isTouchDevice ? `2px auto ${theme.colors[color][500]}` : 'none',
				outlineOffset: !isTouchDevice ? '4px' : 0
			}
		},
		front: {
			borderColor: `${color}.${isLight ? 200 : 500}`,
			backgroundColor: 'gray.50',
			color: `${color}.${isLight ? 200 : 500}`
		},
		disabled: {
			'background': `${theme.colors.gray[isLight ? 200 : 500]} !important`,
			'backgroundColor': `${theme.colors.gray[isLight ? 200 : 500]} !important`,

			'& .card_front': {
				borderColor: `${theme.colors.gray[isLight ? 200 : 500]} !important`,
				backgroundColor: `${theme.colors.gray[50]} !important`,
				color: `${theme.colors.gray[isLight ? 200 : 500]} !important`
			}
		}
	},
	dark: {
		back: {
			'backgroundColor': `${color}.${isLight ? 700 : 400}`,

			'&:hover': {
				'backgroundColor': `${color}.${isLight ? 700 : 400}`,

				'& .card_front': {
					borderColor: `${color}.${isLight ? 700 : 400}`,
					backgroundColor: 'gray.900',
					color: `${color}.${isLight ? 700 : 400}`
				}
			},

			'&:active': {
				'backgroundColor': `${color}.${!isFixed && isClickable ? (isLight ? 600 : 300) : isLight ? 700 : 400}`,

				'& .card_front': {
					borderColor: `${color}.${!isFixed && isClickable ? (isLight ? 600 : 300) : isLight ? 700 : 400}`,
					backgroundColor: 'gray.900',
					color: `${color}.${!isFixed && isClickable ? (isLight ? 600 : 300) : isLight ? 700 : 400}`
				}
			},

			'&:focus-visible': {
				outline: !isTouchDevice ? `2px auto ${theme.colors[color][400]}` : 'none',
				outlineOffset: !isTouchDevice ? '4px' : 0
			}
		},
		front: {
			borderColor: `${color}.${isLight ? 700 : 400}`,
			backgroundColor: 'gray.900',
			color: `${color}.${isLight ? 700 : 400}`
		},
		disabled: {
			'background': `${theme.colors.gray[isLight ? 700 : 400]} !important`,
			'backgroundColor': `${theme.colors.gray[isLight ? 700 : 400]} !important`,

			'& .card_front': {
				borderColor: `${theme.colors.gray[isLight ? 700 : 400]} !important`,
				backgroundColor: `${theme.colors.gray[900]} !important`,
				color: `${theme.colors.gray[isLight ? 700 : 400]} !important`
			}
		}
	}
});
