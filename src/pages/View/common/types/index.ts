import { Location } from 'react-router';

import { TabListTab, TabsProps } from '@davidscicluna/component-library';

import { TotalBadgeProps } from '../../../../components/DataDisplay/TotalBadge/types';
import { TabIconProps } from '../../../../components/Tabs/TabIcon/types';

// TODO: Use TabListTabRenderProps type once exported
type ViewTabGetIconProps = Pick<TabsProps, 'color' | 'colorMode' | 'size'> & {
	isActive: boolean;
};

// TODO: Use TabListTabRenderProps type once exported
type ViewTabGetTotalBadgeProps = Pick<TabsProps, 'color' | 'colorMode' | 'size'> & {
	isActive: boolean;
	total: number;
};

export type ViewTab = Pick<TabListTab, 'label'> & {
	path: Partial<Location>;
	getIconProps?: (props: ViewTabGetIconProps) => TabIconProps;
	getTotalBadgeProps?: (props: ViewTabGetTotalBadgeProps) => TotalBadgeProps;
};
export type ViewTabs = ViewTab[];

export type ViewParams = { id: string };
