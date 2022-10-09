import { Style, utils } from '@davidscicluna/component-library';

import { darken } from 'color2k';

import { color as defaultColor } from '../../../../../../../../../../../../common/data/defaultPropValues';
import { getAmount } from '../../utils';

import { SearchListItemLightStylingProps } from './types';

const { checkIsTouchDevice, getHue } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

export default ({ theme, color = defaultColor }: SearchListItemLightStylingProps): Style => {
	const amount = getAmount();

	const textShade = getHue({ colorMode: 'light', type: 'text.primary' });
	const backgroundShade = getHue({ colorMode: 'light', type: 'background' });
	const colorShade = getHue({ colorMode: 'light', type: 'color' });

	return {
		'color': theme.colors.gray[textShade],
		'borderColor': theme.colors.transparent,
		'backgroundColor': theme.colors.transparent,
		'background': theme.colors.transparent,

		'&:hover': {
			'color': theme.colors.gray[textShade],
			'borderColor': darken(theme.colors.gray[backgroundShade], amount.hover),
			'backgroundColor': darken(theme.colors.gray[backgroundShade], amount.hover),
			'background': darken(theme.colors.gray[backgroundShade], amount.hover),

			'&:active': {
				color: theme.colors.gray[textShade],
				borderColor: darken(theme.colors.gray[backgroundShade], amount.active),
				backgroundColor: darken(theme.colors.gray[backgroundShade], amount.active),
				background: darken(theme.colors.gray[backgroundShade], amount.active)
			}
		},

		'&:active': {
			color: theme.colors.gray[textShade],
			borderColor: darken(theme.colors.gray[backgroundShade], amount.active),
			backgroundColor: darken(theme.colors.gray[backgroundShade], amount.active),
			background: darken(theme.colors.gray[backgroundShade], amount.active)
		},

		'&:focus-visible': {
			outline: !isTouchDevice ? `2px auto ${theme.colors[color][colorShade]}` : 'none',
			outlineOffset: !isTouchDevice ? '4px' : 0
		}
	};
};
