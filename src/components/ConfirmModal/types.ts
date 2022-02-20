import { NonNullable } from '../../common/types';
import { ModalProps } from '../Modal/types';

export type ConfirmModalProps = {
	renderActions: NonNullable<ModalProps['renderActions']>;
	description: string;
} & Omit<ModalProps, 'children' | 'renderActions' | 'isConfirm'>;
