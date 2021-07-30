import { List } from '../../../../../../store/slices/User/types';

export type ListItemProps = {
  isActive?: boolean;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelected?: (id: List['id']) => void;
  onClick?: (id: List['id']) => void;
} & List;
