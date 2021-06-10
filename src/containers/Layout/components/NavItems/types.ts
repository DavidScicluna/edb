import { Icon } from '../../../../common/types/types';

export type NavItemChild = Omit<NavItem, 'icon' | 'iconActive' | 'children'>;

export type NavItem = {
  label: string;
  path: string;
  iconActive: Icon;
  icon: Icon;
  children?: NavItemChild[];
};

export type NavProps = {
  navItems: NavItem[];
  isExpanded?: boolean;
};
