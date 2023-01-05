import { ViewTabs } from '../../../../common/types';

export const overviewTabIndex = 0;
export const creditsTabIndex = 1;
export const photosTabIndex = 2;

const tabs: ViewTabs = [
	{
		path: { hash: 'overview' },
		label: 'Overview'
	},
	{
		path: { hash: 'credits' },
		label: 'Credits',
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
