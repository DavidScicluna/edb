import { List as ListType } from '../../../../../../store/slices/User/types';

export type ToastProps = {
  selected: ListType;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};
