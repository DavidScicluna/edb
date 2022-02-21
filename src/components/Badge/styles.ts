import { BadgeProps, Variant, Size } from './types';

import { Style } from '../../common/types';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
import { Theme } from '../../theme/types';

type VariantStyle = { [key in Variant]: Style };

type SizeStyle = { [key in Size]: Style };

type DefaultStyle = { default: Style };

type BadgeStyle = {
	badge: DefaultStyle & SizeStyle;
	light: VariantStyle;
	dark: VariantStyle;
};

type StyleBadgeProps = {
	color: BadgeProps['color'];
	isLight: BadgeProps['isLight'];
	variant: BadgeProps['variant'];
};

export default (
	theme: Theme,
	{ color = 'gray', isLight = true, variant = 'contained' }: StyleBadgeProps
): BadgeStyle => ({
	badge: {
		'default': {
			display: 'flex',
			flexWrap: 'nowrap',
			alignItems: 'center',
			justifyContent: 'center',

			borderStyle: 'solid',

			fontWeight: 'semibold',
			textTransform: 'uppercase',
			whiteSpace: 'nowrap'
		},
		'xs': {
			height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 8}px`,
			fontSize: 'xs',

			borderRadius: 'sm',
			borderWidth: variant !== 'text' ? '1px' : '0',

			padding: `0 ${theme.space[0.5]}`
		},
		'sm': {
			height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 8}px`,
			fontSize: 'sm',

			borderRadius: 'sm',
			borderWidth: variant !== 'text' ? '1px' : '0',

			padding: `0 ${theme.space[0.5]}`
		},
		'md': {
			height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 8}px`,
			fontSize: 'md',

			borderRadius: 'sm',
			borderWidth: variant !== 'text' ? '2px' : '0',

			padding: `0 ${theme.space[0.5]}`
		},
		'lg': {
			height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.lg, 'rem')) + 8}px`,
			fontSize: 'lg',

			borderRadius: 'sm',
			borderWidth: variant !== 'text' ? '2px' : '0',

			padding: `0 ${theme.space[0.5]}`
		},
		'xl': {
			height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xl, 'rem')) + 8}px`,
			fontSize: 'xl',

			borderRadius: 'base',
			borderWidth: variant !== 'text' ? '2px' : '0',

			padding: `0 ${theme.space[1]}`
		},
		'2xl': {
			height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['2xl'], 'rem')) + 8}px`,
			fontSize: '2xl',

			borderRadius: 'base',
			borderWidth: variant !== 'text' ? '2px' : '0',

			padding: `0 ${theme.space[1]}`
		},
		'3xl': {
			height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['3xl'], 'rem')) + 8}px`,
			fontSize: '3xl',

			borderRadius: 'lg',
			borderWidth: variant !== 'text' ? '2px' : '0',

			padding: `0 ${theme.space[1]}`
		},
		'4xl': {
			height: `${handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['4xl'], 'rem')) + 8}px`,
			fontSize: '4xl',

			borderRadius: 'lg',
			borderWidth: variant !== 'text' ? '2px' : '0',

			padding: `0 ${theme.space[1]}`
		}
	},
	light: {
		contained: {
			borderColor: `${color}.${isLight ? 400 : 800}`,
			backgroundColor: `${color}.${isLight ? 400 : 800}`,
			color: 'gray.50'
		},
		outlined: {
			borderColor: `${color}.${isLight ? 400 : 800}`,
			backgroundColor: 'gray.50',
			color: `${color}.${isLight ? 400 : 800}`
		},
		text: {
			borderColor: 'transparent',
			backgroundColor: 'transparent',
			color: `${color}.${isLight ? 400 : 800}`
		}
	},
	dark: {
		contained: {
			borderColor: `${color}.${isLight ? 400 : 800}`,
			backgroundColor: `${color}.${isLight ? 400 : 800}`,
			color: 'gray.900'
		},
		outlined: {
			borderColor: `${color}.${isLight ? 400 : 800}`,
			backgroundColor: 'gray.900',
			color: `${color}.${isLight ? 400 : 800}`
		},
		text: {
			borderColor: 'transparent',
			backgroundColor: 'transparent',
			color: `${color}.${isLight ? 400 : 800}`
		}
	}
});
