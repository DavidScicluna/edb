import { List } from '../../../../../../store/slices/User/types';

export type EditListProps = {
  list: List;
  isOpen: boolean;
  onClose: () => void;
};

export type Form = {
  label: string;
  description: string;
};
