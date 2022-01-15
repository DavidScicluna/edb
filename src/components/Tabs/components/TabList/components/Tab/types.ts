import { Icon } from '../../../../../../common/types';

type IconProps = {
  width?: string;
  height?: string;
  fontSize?: string;
  isSelected?: boolean;
};

export type Tab = {
  label: string;
  renderLeftIcon?: (props: IconProps) => Icon;
  renderRightIcon?: (props: IconProps) => Icon;
  isDisabled?: boolean;
};

export type Size = 'sm' | 'md' | 'lg';

export type TabsProps = {
  isSelected: boolean;
  isFullWidth?: boolean;
  size?: Size;
} & Tab;
