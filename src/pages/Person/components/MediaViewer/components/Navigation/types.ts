import { NavigationDirection } from '../../types';

export type NavigationProps = {
  current: number;
  total: number;
  onNavigation: (direction: NavigationDirection) => void;
};
