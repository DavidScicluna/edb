import { List } from '../../../../../../store/slices/Users/types';

export type Form = {
	label: string;
	description: string;
};

export type EditListProps = {
	id?: List['id'];
	isOpen: boolean;
	onClose: () => void;
};
