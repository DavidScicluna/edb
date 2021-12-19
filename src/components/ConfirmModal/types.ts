import { ReactElement } from 'react';

import { ModalProps } from '../Modal/types';

export type ConfirmModalProps = {
  actions: ReactElement;
  description: string;
} & Omit<ModalProps, 'children' | 'actions' | 'isConfirm'>;
