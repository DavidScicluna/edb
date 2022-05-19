import { ReactNode } from 'react';

import { FontSizes } from '../../theme/types';

import { NavItemChild } from './components/NavItemChild/types';


type RenderProps = {
	isActive: boolean;
	fontSize: FontSizes['2xl'];
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
