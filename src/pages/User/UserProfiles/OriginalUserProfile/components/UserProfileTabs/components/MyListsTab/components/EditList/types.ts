import { UserList } from '../../../../../../../../../../store/slices/Users/types';

export type EditListForm = Pick<UserList, 'label' | 'description'>;

export type EditListProps = {
	list: UserList;
	isOpen: boolean;
	onClose: () => void;
};
