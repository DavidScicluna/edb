import { List } from '../../../../../../store/slices/User/types';

export type DeleteListProps = {
	id?: List['id'];
	isOpen: boolean;
	onClose: () => void;
	onCloseToast: () => void;
};
