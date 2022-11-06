import { ReactNode } from 'react';

import { Location } from 'react-router';

import { TabsProps, TabListTab } from '@davidscicluna/component-library';

// TODO: Use TabListTabRenderProps type once exported
type RenderIconProps = Pick<TabsProps, 'color' | 'colorMode' | 'size'> & {
	isActive: boolean;
	width?: number;
	height?: number;
};

export type UserProfileTab = Pick<TabListTab, 'label'> & {
	renderIcon?: (props: RenderIconProps) => ReactNode;
	path: Partial<Location>;
};
export type UserProfileTabs = UserProfileTab[];
