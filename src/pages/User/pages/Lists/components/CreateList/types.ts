import { List } from '../../../../../../store/slices/User/types';

export type Form = {
	label: string;
	description: string;
};

export type CreateListProps = {
	isOpen: boolean;
	onSubmit?: (id: List['id']) => void;
	onClose: () => void;
};
