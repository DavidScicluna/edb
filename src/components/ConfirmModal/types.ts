import { ReactElement } from 'react';

export type ConfirmModalProps = {
  renderButton: ReactElement;
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
};
