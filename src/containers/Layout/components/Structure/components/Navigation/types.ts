import { NavItemType, IconType, SideNavigationProps } from '@davidscicluna/component-library';

export type NavItem = Omit<NavItemType, 'renderLeftIcon' | 'renderRightIcon'> & { icon: IconType };
export type NavItems = NavItem[];

export type NavigationProps = Pick<SideNavigationProps, 'isDrawer'> & {
	isDummy?: boolean;
};
