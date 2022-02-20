import { NavItemChild } from './components/NavItemChild/types';

import { Icon } from '../../common/types';
import { FontSizes } from '../../theme/types';

type RenderProps = {
	isActive: boolean;
	fontSize: FontSizes['2xl'];
};

export type NavItem = {
	renderIcon: (props: RenderProps) => Icon;
	children?: NavItemChild[];
	label: string;
	path?: string;
	isExpanded?: boolean;
	isDisabled?: boolean;
	onClick?: () => void;
};
