import { Icon } from '../../common/types';
import { SidebarMode } from '../../store/slices/App/types';
import { FontSizes } from '../../theme/types';
import { NavItemChild } from './components/NavItemChild/types';

type RenderIconProps = {
  isActive: boolean;
  fontSize: FontSizes['2xl'];
};

export type NavItem = {
  renderIcon: (props: RenderIconProps) => Icon;
  children?: NavItemChild[];
  label: string;
  path?: string;
  sidebarMode?: SidebarMode;
  onClick?: () => void;
};
