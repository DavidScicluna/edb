import { ReactElement } from 'react';

import { TabListProps } from '../../../Tabs/components/TabList/types';
import { TabsRef, TabsProps } from '../../../Tabs/types';
import { HorizontalGridProps } from '../types';

export type HorizontalGridTabbedRef = TabsRef;

type ChildrenProps = {
	children: ReactElement[];
};

export type HorizontalGridTabbedProps = {
	children: ReactElement<ChildrenProps>[];
	activeTab: TabsProps['activeTab'];
	onChange: TabsProps['onChange'];
	renderTabListProps: Omit<TabListProps, 'activeTab'>;
} & HorizontalGridProps;
