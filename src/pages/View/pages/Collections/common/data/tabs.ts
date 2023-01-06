import { formatMediaType, formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../common/utils';
import { ViewTabs } from '../../../../common/types';

export const overviewTabIndex = 0;
export const moviesTabIndex = 1;
export const photosTabIndex = 2;

const tabs: ViewTabs = [
	{
		path: { hash: 'overview' },
		label: 'Overview'
	},
	{
		path: { hash: formatMediaType({ mediaType: 'movie' }) },
		label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
		getIconProps: ({ color, isActive, ...rest }) => {
			return {
				...rest,
				icon: getMediaTypeIcon({ mediaType: 'movie' }),
				category: isActive ? 'filled' : 'outlined',
				skeletonColor: color
			};
		},
		getTotalBadgeProps: ({ color, isActive, ...rest }) => {
			return { ...rest, color: isActive ? color : 'gray', variant: isActive ? 'contained' : 'outlined' };
		}
	},
	{
		path: { hash: 'photos' },
		label: 'Photos',
		getTotalBadgeProps: ({ color, isActive, ...rest }) => {
			return { ...rest, color: isActive ? color : 'gray', variant: isActive ? 'contained' : 'outlined' };
		}
	}
];

export default tabs;
