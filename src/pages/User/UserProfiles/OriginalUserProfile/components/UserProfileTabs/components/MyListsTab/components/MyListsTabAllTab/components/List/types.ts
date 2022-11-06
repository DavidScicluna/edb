import { UserList } from '../../../../../../../../../../../../store/slices/Users/types';

export type ListProps = {
	list: UserList;
	isDisabled?: boolean;
	isSelected?: boolean;
	onSelectList: () => void;
	onListClick: () => void;
};
