import { Style, utils } from '@davidscicluna/component-library';

import { lighten } from 'color2k';

import { color as defaultColor } from '../../../../../../../../../../../../common/data/defaultPropValues';
import { getAmount } from '../../utils';

import { SearchListItemDarkStylingProps } from './types';

const { checkIsTouchDevice, getHue } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

export default ({ theme, color = defaultColor }: SearchListItemDarkStylingProps): Style => {
	const amount = getAmount();

	const textShade = getHue({ colorMode: 'dark', type: 'text.primary' });
	const backgroundShade = getHue({ colorMode: 'dark', type: 'background' });
	const colorShade = getHue({ colorMode: 'dark', type: 'color' });

	return {
		'color': theme.colors.gray[textShade],
		'borderColor': theme.colors.gray[backgroundShade],
		'backgroundColor': theme.colors.gray[backgroundShade],
		'background': theme.colors.gray[backgroundShade],

		'&:hover': {
			'color': theme.colors.gray[textShade],
			'borderColor': lighten(theme.colors.gray[backgroundShade], amount.hover),
			'backgroundColor': lighten(theme.colors.gray[backgroundShade], amount.hover),
			'background': lighten(theme.colors.gray[backgroundShade], amount.hover),

			'&:active': {
				color: theme.colors.gray[textShade],
				borderColor: lighten(theme.colors.gray[backgroundShade], amount.active),
				backgroundColor: lighten(theme.colors.gray[backgroundShade], amount.active),
				background: lighten(theme.colors.gray[backgroundShade], amount.active)
			}
		},

		'&:active': {
			color: theme.colors.gray[textShade],
			borderColor: lighten(theme.colors.gray[backgroundShade], amount.active),
			backgroundColor: lighten(theme.colors.gray[backgroundShade], amount.active),
			background: lighten(theme.colors.gray[backgroundShade], amount.active)
		},

		'&:focus-visible': {
			outline: !isTouchDevice ? `2px auto ${theme.colors[color][colorShade]}` : 'none',
			outlineOffset: !isTouchDevice ? '4px' : 0
		}
	};
};
