import { List } from '../../../../../../store/slices/User/types';

export type DeleteListProps = {
  list: List;
  isOpen: boolean;
  onClose: () => void;
  onCloseToast: () => void;
};
