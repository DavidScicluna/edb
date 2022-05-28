import { Theme, Style } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { LinkProps } from './types';

type LinkStyle = {
	common: {
		link: Style;
		icon: Style;
	};
};

type StyleLinkProps = {
	colorMode: ColorMode;
	color: LinkProps['color'];
};

export default (theme: Theme, { colorMode, color }: StyleLinkProps): LinkStyle => ({
	common: {
		link: {
			'cursor': 'pointer',

			'width': 'auto',
			'height': 'auto',

			'minWidth': 'auto',
			'minHeight': 'auto',
			'maxWidth': 'none',
			'maxHeight': 'none',

			'display': 'flex',
			'alignItems': 'center',
			'justifyContent': 'center',

			'padding': theme.space[1],

			'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

			'color': `gray.${colorMode === 'light' ? 400 : 500}`,

			'&:hover': {
				color,
				textDecoration: 'none !important'
			},

			'&:focus': {
				boxShadow: 'none'
			},

			'& .edb-icon': {
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
			}
		},
		icon: {
			'width': theme.fontSizes['2xl'],
			'height': theme.fontSizes['2xl'],

			'& .edb-icon': {
				display: 'block',

				fontSize: theme.fontSizes['2xl']
			}
		}
	}
});
