import { UserList } from '../../../../../../../../../../../store/slices/Users/types';

export type CreateListForm = Pick<UserList, 'label' | 'description'>;

export type CreateListOnSubmitProps = Pick<UserList, 'id'>;

export type CreateListProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit?: (props: CreateListOnSubmitProps) => void;
};
