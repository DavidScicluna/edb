import { Style, utils } from '@davidscicluna/component-library';

import { lighten } from 'color2k';

import { color as defaultColor } from '../../../../../../../../../../common/data/defaultPropValues';
import { getAmount } from '../../utils';
import { isActive as defaultIsActive } from '../../data/defaultPropValues';

import { SearchedKeywordDarkStylingProps } from './types';

const { checkIsTouchDevice, getHue } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

export default ({
	theme,
	color: colorProp = defaultColor,
	isActive = defaultIsActive
}: SearchedKeywordDarkStylingProps): Style => {
	const amount = getAmount();

	const textShade = getHue({ colorMode: 'dark', type: isActive ? 'color' : 'text.primary' });
	const backgroundShade = getHue({ colorMode: 'dark', type: 'background' });
	const colorShade = getHue({ colorMode: 'dark', type: 'color' });

	const color = isActive ? colorProp : 'gray';

	return {
		'color': theme.colors[color][textShade],
		'borderColor': theme.colors.transparent,
		'backgroundColor': theme.colors.transparent,
		'background': theme.colors.transparent,

		'&:hover': {
			'color': theme.colors[color][textShade],
			'borderColor': lighten(theme.colors.gray[backgroundShade], amount.hover),
			'backgroundColor': lighten(theme.colors.gray[backgroundShade], amount.hover),
			'background': lighten(theme.colors.gray[backgroundShade], amount.hover),

			'&:active': {
				color: theme.colors[color][textShade],
				borderColor: lighten(theme.colors.gray[backgroundShade], amount.active),
				backgroundColor: lighten(theme.colors.gray[backgroundShade], amount.active),
				background: lighten(theme.colors.gray[backgroundShade], amount.active)
			}
		},

		'&:active': {
			color: theme.colors[color][textShade],
			borderColor: lighten(theme.colors.gray[backgroundShade], amount.active),
			backgroundColor: lighten(theme.colors.gray[backgroundShade], amount.active),
			background: lighten(theme.colors.gray[backgroundShade], amount.active)
		},

		'&:focus-visible': {
			outline: !isTouchDevice ? `2px auto ${theme.colors[colorProp][colorShade]}` : 'none',
			outlineOffset: !isTouchDevice ? '4px' : 0
		}
	};
};
