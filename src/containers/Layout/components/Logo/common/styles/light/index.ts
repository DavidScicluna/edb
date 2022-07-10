import { Style, utils } from '@davidscicluna/component-library';

import { darken } from 'color2k';

import { color as defaultColor } from '../../../../../../../common/data/defaultPropValues';
import { size as defaultSize } from '../../data/defaultPropValues';
import { getAmount, getSizeConfig } from '../../utils';

import { LogoLightStylingProps } from './types';

const { checkIsTouchDevice, getHue } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

export default ({ theme, color = defaultColor, size = defaultSize }: LogoLightStylingProps): Style => {
	const amount = getAmount();
	const textShade = getHue({ colorMode: 'light', type: 'background' });
	const colorShade = getHue({ colorMode: 'light', type: 'color' });

	const config = getSizeConfig({ size });
	const border = config.border;
	const offset = config.offset;

	return {
		'color': theme.colors.gray[textShade],
		'borderColor': theme.colors[color][colorShade],
		'backgroundColor': theme.colors[color][colorShade],
		'background': theme.colors[color][colorShade],

		'&:hover': {
			'color': theme.colors.gray[textShade],
			'borderColor': darken(theme.colors[color][colorShade], amount.hover),
			'backgroundColor': darken(theme.colors[color][colorShade], amount.hover),
			'background': darken(theme.colors[color][colorShade], amount.hover),

			'&:active': {
				color: theme.colors.gray[textShade],
				borderColor: darken(theme.colors[color][colorShade], amount.active),
				backgroundColor: darken(theme.colors[color][colorShade], amount.active),
				background: darken(theme.colors[color][colorShade], amount.active)
			}
		},

		'&:active': {
			color: theme.colors.gray[textShade],
			borderColor: darken(theme.colors[color][colorShade], amount.active),
			backgroundColor: darken(theme.colors[color][colorShade], amount.active),
			background: darken(theme.colors[color][colorShade], amount.active)
		},

		'&:focus-visible': {
			outline: !isTouchDevice ? `${border}px auto ${theme.colors[color][colorShade]}` : 'none',
			outlineOffset: !isTouchDevice ? `${offset}px` : 0
		}
	};
};
