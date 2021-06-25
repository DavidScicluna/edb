import { ReactElement } from 'react';

import { ModalProps as CUIModalProps } from '@chakra-ui/react';

export type ModalProps = { title: string; actions?: ReactElement } & CUIModalProps;
