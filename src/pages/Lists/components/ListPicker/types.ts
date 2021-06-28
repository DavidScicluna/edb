import { List } from '../../../../store/slices/User/types';

export type ListPickerProps = {
  activeList: List | null;
  isOpen: boolean;
  onClose: () => void;
};
