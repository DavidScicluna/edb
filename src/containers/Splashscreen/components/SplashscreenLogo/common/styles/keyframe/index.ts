import { Style, utils } from '@davidscicluna/component-library';

import { transparentize } from 'color2k';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';
import { colors as defaultColors, size as defaultSize } from '../../data/defaultPropValues';

import { SplashscreenLogoKeyframeStyleProps } from './types';

const { getColor } = utils;

export default ({
	theme,
	color = defaultColor,
	colors = defaultColors,
	colorMode = defaultColorMode,
	size = defaultSize
}: SplashscreenLogoKeyframeStyleProps): Style => {
	const colorTextPrimary = getColor({ theme, colorMode, type: 'text.primary' });
	const color0 = getColor({ theme, colorMode, color: colors[0], type: 'color' });
	const color1 = getColor({ theme, colorMode, color: colors[1], type: 'color' });
	const color2 = getColor({ theme, colorMode, color: colors[2], type: 'color' });
	const color3 = getColor({ theme, colorMode, color: colors[3], type: 'color' });
	const color4 = getColor({ theme, colorMode, color: colors[4], type: 'color' });
	const color5 = getColor({ theme, colorMode, color: colors[5], type: 'color' });
	const color6 = getColor({ theme, colorMode, color: colors[6], type: 'color' });
	const color7 = getColor({ theme, colorMode, color: colors[7], type: 'color' });
	const color8 = getColor({ theme, colorMode, color: colors[8], type: 'color' });
	const color9 = getColor({ theme, colorMode, color: colors[9], type: 'color' });
	const colorMain = getColor({ theme, colorMode, color, type: 'color' });

	return {
		'@keyframes logo-flicker': {
			'0%': {
				opacity: 0,
				color: colorTextPrimary
			},
			'10%': {
				opacity: 0,
				color: colorTextPrimary,
				textShadow: 'none'
			},
			'10.1%': {
				opacity: 1,
				color: colorTextPrimary,
				textShadow: 'none'
			},
			'10.2%': {
				opacity: 0,
				color: colorTextPrimary,
				textShadow: 'none'
			},
			'20%': {
				opacity: 0,
				color: colorTextPrimary,
				textShadow: 'none'
			},
			'20.1%': {
				opacity: 1,
				color: color0,
				textShadow: `0 0 ${size}px ${transparentize(color0, 0.75)}`
			},
			'20.6%': {
				opacity: 0,
				color: color0,
				textShadow: 'none'
			},
			'30%': {
				opacity: 0,
				color: color0,
				textShadow: 'none'
			},
			'30.1%': {
				opacity: 1,
				color: color1,
				textShadow: `0 0 ${size}px ${transparentize(color1, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color1,
					0.75
				)}`
			},
			'30.5%': {
				opacity: 1,
				color: color1,
				textShadow: `0 0 ${size}px ${transparentize(color1, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color1,
					0.75
				)}`
			},
			'30.6%': {
				opacity: 0,
				color: color1,
				textShadow: 'none'
			},
			'45%': {
				opacity: 0,
				color: color1,
				textShadow: 'none'
			},
			'45.1%': {
				opacity: 1,
				color: color2,
				textShadow: `0 0 ${size}px ${transparentize(color2, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color2,
					0.75
				)}`
			},
			'50%': {
				opacity: 1,
				color: color3,
				textShadow: `0 0 ${size}px ${transparentize(color3, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color3,
					0.75
				)}`
			},
			'55%': {
				opacity: 1,
				color: color4,
				textShadow: `0 0 ${size}px ${transparentize(color4, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color4,
					0.75
				)}`
			},
			'55.1%': {
				opacity: 0,
				color: color4,
				textShadow: 'none'
			},
			'57%': {
				opacity: 0,
				color: color4,
				textShadow: 'none'
			},
			'57.1%': {
				opacity: 1,
				color: color5,
				textShadow: `0 0 ${size}px ${transparentize(color5, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color5,
					0.75
				)}`
			},
			'60%': {
				opacity: 1,
				color: color6,
				textShadow: `0 0 ${size}px ${transparentize(color6, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color6,
					0.75
				)}`
			},
			'60.1%': {
				opacity: 0,
				color: color6,
				textShadow: 'none'
			},
			'65%': {
				opacity: 0,
				color: color6,
				textShadow: 'none'
			},
			'65.1%': {
				opacity: 1,
				color: color7,
				textShadow: `0 0 ${size}px ${transparentize(color7, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color7,
					0.75
				)}, 0 0 ${size * 4}px ${transparentize(color7, 0.9)}`
			},
			'75%': {
				opacity: 1,
				color: color7,
				textShadow: `0 0 ${size}px ${transparentize(color7, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color7,
					0.75
				)}, 0 0 ${size * 4}px ${transparentize(color7, 0.9)}`
			},
			'75.1%': {
				opacity: 0,
				color: color7,
				textShadow: 'none'
			},
			'77%': {
				opacity: 0,
				color: color7,
				textShadow: 'none'
			},
			'77.1%': {
				opacity: 1,
				color: color8,
				textShadow: `0 0 ${size}px ${transparentize(color8, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color8,
					0.5
				)}, 0 0 ${size * 6}px ${transparentize(color8, 0.8)}, 0 0 ${size * 4}px ${transparentize(color8, 0.9)}`
			},
			'85%': {
				opacity: 1,
				color: color8,
				textShadow: `0 0 ${size}px ${transparentize(color8, 0.55)}, 0 0 ${size * 2}px ${transparentize(
					color8,
					0.6
				)}, 0 0 ${size * 6}px ${transparentize(color8, 0.8)}, 0 0 ${size * 4}px ${transparentize(color8, 0.9)}`
			},
			'85.1%': {
				opacity: 0,
				color: color8,
				textShadow: 'none'
			},
			'86%': {
				opacity: 0,
				color: color8,
				textShadow: 'none'
			},
			'86.1%': {
				opacity: 1,
				color: color9,
				textShadow: `0 0 ${size}px ${transparentize(color9, 0.6)}, 0 0 ${size * 2}px ${transparentize(
					color9,
					0.65
				)}, 0 0 ${size * 6}px ${transparentize(color9, 0.75)}, 0 0 ${size * 4}px ${transparentize(color9, 0.9)}`
			},
			'100%': {
				opacity: 1,
				color: colorMain,
				textShadow: `0 0 ${size}px ${transparentize(colorMain, 0.6)}, 0 0 ${size * 2}px ${transparentize(
					colorMain,
					0.65
				)}, 0 0 ${size * 6}px ${transparentize(colorMain, 0.75)}, 0 0 ${size * 4}px ${transparentize(
					colorMain,
					0.9
				)}`
			}
		},

		'animationName': 'logo-flicker',
		'animationDuration': '7500ms',
		'animationFillMode': 'both',
		'animationTimingFunction': theme.transition.easing['ease-in-out']
	};
};
