import { Location } from 'react-router';

import { TabListTab } from '@davidscicluna/component-library';

export type PersonTab = Pick<TabListTab, 'label'> & {
	path: Partial<Location>;
};
export type PersonTabs = PersonTab[];
