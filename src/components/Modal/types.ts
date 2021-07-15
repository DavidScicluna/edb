import { ReactElement } from 'react';

import { ModalProps as CUIModalProps } from '@chakra-ui/react';

import { Theme } from '../../store/slices/User/types';

export type ModalProps = { title: string; actions?: ReactElement; colorMode?: Theme['background'] } & CUIModalProps;
