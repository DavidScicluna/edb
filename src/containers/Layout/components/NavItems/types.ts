import { NavItem } from '../../../../components/NavItem/types';
import { SidebarMode } from '../../../../store/slices/App/types';

export type NavItemsProps = {
  navItems: NavItem[];
  sidebarMode?: SidebarMode;
};
