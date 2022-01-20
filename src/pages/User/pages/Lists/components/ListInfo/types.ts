import { List } from '../../../../../../store/slices/User/types';

export type ListInfoProps = {
  id?: List['id'];
  isOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};
