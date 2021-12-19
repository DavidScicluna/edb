import { Icon } from '../../common/types/types';
import { SidebarMode } from '../../store/slices/App/types';

export type NavItemChild = { renderChild: boolean } & Omit<NavItem, 'icon' | 'iconActive' | 'children'>;

export type NavItem = {
  children?: NavItemChild[];
  label: string;
  path?: string;
  icon: Icon;
  sidebarMode?: SidebarMode;
  onClick?: () => void;
};
