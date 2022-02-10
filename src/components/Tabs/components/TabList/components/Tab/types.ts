import { Icon } from '../../../../../../common/types';
import { Color } from '../../../../../../theme/types';

export type RenderProps = {
  width?: string;
  height?: string;
  color?: keyof Color;
  isSelected?: boolean;
  fontSize?: string;
  size?: 'xs' | 'sm' | 'md';
};

export type Tab = {
  label: string;
  renderLeft?: (props: RenderProps) => Icon;
  renderRight?: (props: RenderProps) => Icon;
  isDisabled?: boolean;
};

export type Size = 'sm' | 'md' | 'lg';

export type TabsProps = Tab & {
  color?: keyof Color;
  total?: number;
  isSelected: boolean;
  isFullWidth?: boolean;
  size?: Size;
};
