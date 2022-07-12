import { Style, utils } from '@davidscicluna/component-library';

import { lighten } from 'color2k';

import { color as defaultColor } from '../../../../../common/data/defaultPropValues';
import { size as defaultSize } from '../../data/defaultPropValues';
import { getAmount, getSizeConfig } from '../../utils';

import { LogoDarkStylingProps } from './types';

const { checkIsTouchDevice, getHue } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

export default ({ theme, color = defaultColor, size = defaultSize }: LogoDarkStylingProps): Style => {
	const amount = getAmount();
	const textShade = getHue({ colorMode: 'dark', type: 'background' });
	const colorShade = getHue({ colorMode: 'dark', type: 'color' });

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
			'borderColor': lighten(theme.colors[color][colorShade], amount.hover),
			'backgroundColor': lighten(theme.colors[color][colorShade], amount.hover),
			'background': lighten(theme.colors[color][colorShade], amount.hover),

			'&:active': {
				color: theme.colors.gray[textShade],
				borderColor: lighten(theme.colors[color][colorShade], amount.active),
				backgroundColor: lighten(theme.colors[color][colorShade], amount.active),
				background: lighten(theme.colors[color][colorShade], amount.active)
			}
		},

		'&:active': {
			color: theme.colors.gray[textShade],
			borderColor: lighten(theme.colors[color][colorShade], amount.active),
			backgroundColor: lighten(theme.colors[color][colorShade], amount.active),
			background: lighten(theme.colors[color][colorShade], amount.active)
		},

		'&:focus-visible': {
			outline: !isTouchDevice ? `${border}px auto ${theme.colors[color][colorShade]}` : 'none',
			outlineOffset: !isTouchDevice ? `${offset}px` : 0
		}
	};
};
