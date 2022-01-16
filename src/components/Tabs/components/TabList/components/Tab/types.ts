import { Icon } from '../../../../../../common/types';

type RenderProps = {
  width?: string;
  height?: string;
  fontSize?: string;
  isSelected?: boolean;
};

export type Tab = {
  label: string;
  renderLeftIcon?: (props: RenderProps) => Icon;
  renderRightIcon?: (props: RenderProps) => Icon;
  isDisabled?: boolean;
};

export type Size = 'sm' | 'md' | 'lg';

export type TabsProps = Tab & {
  isSelected: boolean;
  isFullWidth?: boolean;
  size?: Size;
};
