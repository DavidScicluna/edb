import { ReactElement } from 'react';

import { TabListProps } from '../../../Tabs/components/TabList/types';
import { TabsProps } from '../../../Tabs/types';
import { HorizontalGridProps } from '../types';

type ChildrenProps = {
	children: ReactElement[];
};

export type HorizontalGridTabbedProps = {
	children: ReactElement<ChildrenProps>[];
	activeTab: TabsProps['activeTab'];
	onChange: TabsProps['onChange'];
	renderTabListProps: Omit<TabListProps, 'activeTab'>;
} & Omit<HorizontalGridProps, 'title'>;
