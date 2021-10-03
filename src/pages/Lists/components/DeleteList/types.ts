export type DeleteListProps = {
  id?: string;
  label?: string;
  isOpen: boolean;
  onClose: () => void;
  onCloseToast: () => void;
};
