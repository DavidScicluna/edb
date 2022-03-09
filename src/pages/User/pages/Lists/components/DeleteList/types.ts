import { List } from '../../../../../../store/slices/Users/types';

export type DeleteListProps = {
	id?: List['id'];
	isOpen: boolean;
	onClose: () => void;
	onCloseToast: () => void;
};
