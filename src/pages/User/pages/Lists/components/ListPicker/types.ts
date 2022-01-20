import { List } from '../../../../../../store/slices/User/types';

export type ListPickerProps = {
  lists: List[];
  selectedListID?: List['id'];
  onSelected: (id: List['id']) => void;
  onOpenList: (index: number) => void;
};
