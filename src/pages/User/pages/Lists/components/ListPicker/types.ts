import { List } from '../../../../../../store/slices/User/types';

export type ListPickerProps = {
  lists: List[];
  selected?: List;
  onSelected: (id: List['id']) => void;
  onOpenList: (index: number) => void;
};
