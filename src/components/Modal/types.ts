import { ReactElement } from 'react';

import { ColorMode, ModalProps as CUIModalProps } from '@chakra-ui/react';

export type ModalProps = {
  title: ReactElement | string;
  actions?: ReactElement;
  colorMode?: ColorMode;
  isConfirm?: boolean;
} & CUIModalProps;
