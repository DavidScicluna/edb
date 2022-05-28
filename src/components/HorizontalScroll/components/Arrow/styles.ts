import { Theme, Style } from '@davidscicluna/component-library';

import { handleConvertHexToRGB } from '../../common/utils';

import { ArrowProps } from './types';

type DirectionStyle = {
	left: Style;
	right: Style;
};

type ArrowStyle = {
	arrow: Style;
	light: DirectionStyle;
	dark: DirectionStyle;
};

type StyleArrowProps = {
	isDisabled: ArrowProps['isDisabled'];
};

export default (theme: Theme, { isDisabled = false }: StyleArrowProps): ArrowStyle => ({
	arrow: {
		content: '""',

		display: 'block',

		pointerEvents: 'none',

		transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
	},
	light: {
		left: {
			backgroundColor: 'gray.50',

			MozBackground: !isDisabled
				? `-moz-linear-gradient(90deg, ${handleConvertHexToRGB(
						theme.colors.gray[50],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			WebkitLinearBackground: !isDisabled
				? `-webkit-linear-gradient(90deg, ${handleConvertHexToRGB(
						theme.colors.gray[50],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			background: !isDisabled
				? `linear-gradient(90deg, ${handleConvertHexToRGB(theme.colors.gray[50], 1)} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			filter: !isDisabled
				? `progid:DXImageTransform.Microsoft.gradient(startColorstr="${theme.colors.gray[50]}",endColorstr="transparent",GradientType=1)`
				: 'transparent'
		},
		right: {
			backgroundColor: 'gray.50',
			MozBackground: !isDisabled
				? `-moz-linear-gradient(270deg, ${handleConvertHexToRGB(
						theme.colors.gray[50],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			WebkitLinearBackground: !isDisabled
				? `-webkit-linear-gradient(270deg, ${handleConvertHexToRGB(
						theme.colors.gray[50],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			background: !isDisabled
				? `linear-gradient(270deg, ${handleConvertHexToRGB(
						theme.colors.gray[50],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			filter: !isDisabled
				? `progid:DXImageTransform.Microsoft.gradient(startColorstr="${theme.colors.gray[50]}",endColorstr="transparent",GradientType=1)`
				: 'transparent'
		}
	},
	dark: {
		left: {
			backgroundColor: 'gray.900',
			MozBackground: !isDisabled
				? `-moz-linear-gradient(90deg, ${handleConvertHexToRGB(
						theme.colors.gray[900],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			WebkitLinearBackground: !isDisabled
				? `-webkit-linear-gradient(90deg, ${handleConvertHexToRGB(
						theme.colors.gray[900],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			background: !isDisabled
				? `linear-gradient(90deg, ${handleConvertHexToRGB(
						theme.colors.gray[900],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			filter: !isDisabled
				? `progid:DXImageTransform.Microsoft.gradient(startColorstr="${theme.colors.gray[900]}",endColorstr="transparent",GradientType=1)`
				: 'transparent'
		},
		right: {
			backgroundColor: 'gray.900',
			MozBackground: !isDisabled
				? `-moz-linear-gradient(270deg, ${handleConvertHexToRGB(
						theme.colors.gray[900],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			WebkitLinearBackground: !isDisabled
				? `-webkit-linear-gradient(270deg, ${handleConvertHexToRGB(
						theme.colors.gray[900],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			background: !isDisabled
				? `linear-gradient(270deg, ${handleConvertHexToRGB(
						theme.colors.gray[900],
						1
				  )} 0%, rgba(0, 0, 0, 0) 100%)`
				: 'transparent',
			filter: !isDisabled
				? `progid:DXImageTransform.Microsoft.gradient(startColorstr="${theme.colors.gray[900]}",endColorstr="transparent",GradientType=1)`
				: 'transparent'
		}
	}
});
