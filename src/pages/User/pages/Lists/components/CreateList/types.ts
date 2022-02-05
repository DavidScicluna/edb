export type Form = {
  label: string;
  description: string;
};

export type CreateListProps = {
  isOpen: boolean;
  onSubmit?: () => void;
  onClose: () => void;
};
