import { Icon } from '../../../../../../common/types/types';

export type UserLink = {
  label: string;
  path?: string;
  iconActive: Icon;
  icon: Icon;
  onClick?: () => void;
};
