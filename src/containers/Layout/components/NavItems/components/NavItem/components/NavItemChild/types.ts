import { NavItemChild } from '../../../../types';

export type NavItemChildProps = {
  isLastChild?: boolean;
} & Omit<NavItemChild, 'renderChild'>;
