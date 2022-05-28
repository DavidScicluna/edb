import { ReactNode } from 'react';

import { FontSize } from '@davidscicluna/component-library';

import { NavItemChild } from './components/NavItemChild/types';

type RenderProps = {
	isActive: boolean;
	fontSize: FontSize;
};

export type NavItem = {
	renderIcon: (props: RenderProps) => ReactNode;
	children?: NavItemChild[];
	label: string;
	path?: string;
	isExpanded?: boolean;
	isDisabled?: boolean;
	onClick?: () => void;
};
