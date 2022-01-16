import { List } from '../../../../../../../store/slices/User/types';

export type ListProps = {
  list: List;
  isSelected?: boolean;
  onClick: (id: List['id'], isSelected: boolean) => void;
};
