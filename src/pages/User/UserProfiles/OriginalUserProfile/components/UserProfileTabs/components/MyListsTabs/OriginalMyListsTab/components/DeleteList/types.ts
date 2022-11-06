import { UserList } from '../../../../../../../../../../../store/slices/Users/types';

export type DeleteListProps = {
	list: UserList;
	isOpen: boolean;
	onClose: () => void;
	onDelete?: () => void;
};
