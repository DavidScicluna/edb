import { Location } from 'react-router';

import { TabListTab } from '@davidscicluna/component-library';

export type EditUsersTab = Pick<TabListTab, 'label'> & {
	path: Partial<Location>;
};

export type EditUsersTabs = EditUsersTab[];

const tabs: EditUsersTabs = [
	{
		path: { hash: 'details' },
		label: 'Details'
	},
	{
		path: { hash: 'password' },
		label: 'Password'
	},
	{
		path: { hash: 'genres' },
		label: 'Favored Genres'
	},
	{
		path: { hash: 'customization' },
		label: 'Customization'
	},
	{
		path: { hash: 'assets' },
		label: 'Avatar & Background'
	}
];

export default tabs;
