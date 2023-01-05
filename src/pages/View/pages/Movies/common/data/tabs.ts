import { ViewTabs } from '../../../../common/types';

export const overviewTabIndex = 0;
export const castTabIndex = 1;
export const crewTabIndex = 2;
export const reviewsTabIndex = 3;
export const photosTabIndex = 4;
export const videosTabIndex = 5;

const tabs: ViewTabs = [
	{
		path: { hash: 'overview' },
		label: 'Overview'
	},
	{
		path: { hash: 'cast' },
		label: 'Cast',
		getTotalBadgeProps: ({ color, isActive, ...rest }) => {
			return { ...rest, color: isActive ? color : 'gray', variant: isActive ? 'contained' : 'outlined' };
		}
	},
	{
		path: { hash: 'crew' },
		label: 'Crew',
		getTotalBadgeProps: ({ color, isActive, ...rest }) => {
			return { ...rest, color: isActive ? color : 'gray', variant: isActive ? 'contained' : 'outlined' };
		}
	},
	{
		path: { hash: 'reviews' },
		label: 'Reviews',
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
	},
	{
		path: { hash: 'videos' },
		label: 'Videos',
		getTotalBadgeProps: ({ color, isActive, ...rest }) => {
			return { ...rest, color: isActive ? color : 'gray', variant: isActive ? 'contained' : 'outlined' };
		}
	}
];

export default tabs;
