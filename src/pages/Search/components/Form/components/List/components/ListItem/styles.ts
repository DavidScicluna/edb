import { ListItemProps, Variant } from './types';

import { Style } from '../../../../../../../../common/types';
import { Theme } from '../../../../../../../../theme/types';

type ListItemStyle = {
	common: Style;
	light: Style;
	dark: Style;
};

type StyleListItemProps = {
	isLoading: ListItemProps['isLoading'];
	variant: Variant;
};

export default (theme: Theme, { isLoading = true, variant }: StyleListItemProps): ListItemStyle => ({
	common: {
		'cursor': isLoading ? 'not-allowed' : 'pointer',

		'width': '100%',

		'display': 'flex',
		'flexDirection': 'row',
		'flexWrap': 'nowrap',
		'alignItems': 'center',
		'justifyContent': 'space-between',

		'pointerEvents': isLoading ? 'none' : 'auto',

		'borderRadius': theme.radii.base,

		'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

		'& .chakra-text': {
			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		},

		'& svg': {
			transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
		}
	},
	light: {
		'backgroundColor': variant === 'transparent' ? 'transparent' : 'gray.50',

		'& .chakra-text': {
			color: 'gray.400'
		},

		'&:hover': {
			'backgroundColor': 'gray.100',

			'& .chakra-text': {
				color: 'gray.900'
			}
		},

		'&:focus': {
			'backgroundColor': 'gray.100',

			'& .chakra-text': {
				color: 'gray.900'
			}
		}
	},
	dark: {
		'backgroundColor': variant === 'transparent' ? 'transparent' : 'gray.900',

		'& .chakra-text': {
			color: 'gray.500'
		},

		'&:hover': {
			'backgroundColor': 'gray.800',

			'& .chakra-text': {
				color: 'gray.50'
			}
		},

		'&:focus': {
			'backgroundColor': 'gray.800',

			'& .chakra-text': {
				color: 'gray.50'
			}
		}
	}
});
