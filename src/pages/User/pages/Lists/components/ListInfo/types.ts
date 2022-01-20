import { List } from '../../../../../../store/slices/User/types';

export type ListInfoProps = {
  list?: List | null;
  isOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};
