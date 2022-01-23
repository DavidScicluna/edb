import { Icon } from '../../../../../../common/types';
import { IconProps as ButtonIconProps } from '../../../../../../components/Clickable/Button/types';
import { SearchType as SearchTypeValue } from '../../../../../../store/slices/User/types';
import { Color } from '../../../../../../theme/types';

type IconProps = { isActive: boolean } & ButtonIconProps;

export type SearchType = {
  value: SearchTypeValue;
  label: string;
  color: keyof Color;
  renderLeftIcon: (props: IconProps) => Icon;
};

export type SearchTypeProps = {
  isActive: boolean;
  onClick: (value: SearchTypeValue) => void;
} & SearchType;
