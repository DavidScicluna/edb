import { Theme, Style } from '@davidscicluna/component-library';

export default (theme: Theme, isFullWidth = false): Style => ({
	'width': isFullWidth ? '100%' : 'auto',
	'height': '100%',

	'WebkitTapHighlightColor': 'transparent',

	'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

	'&:hover': {
		textDecoration: 'none'
	},

	'&:focus': {
		boxShadow: 'none'
	}
});
