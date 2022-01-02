import { NavItem } from '../../types';

export type NavItemChild = { renderChild: boolean } & Omit<NavItem, 'renderIcon' | 'children'>;

export type NavItemChildProps = {
  isLastChild?: boolean;
} & Omit<NavItemChild, 'renderChild'>;
