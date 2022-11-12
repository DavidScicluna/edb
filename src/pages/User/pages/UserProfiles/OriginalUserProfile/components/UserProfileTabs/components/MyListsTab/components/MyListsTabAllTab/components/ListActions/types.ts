import { UserList } from '../../../../../../../../../../../../../store/slices/Users/types';

export type ListActionsProps = {
	list: UserList;
	isOpen: boolean;
	onEdit: () => void;
	onDelete: () => void;
	onClose: () => void;
};
