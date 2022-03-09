import { List } from '../../../../../../store/slices/Users/types';

export type ListInfoProps = {
	id?: List['id'];
	isOpen: boolean;
	onEdit: () => void;
	onDelete: () => void;
	onClose: () => void;
};
