import { UserList } from '../../../../../../../../../store/slices/Users/types';

export type OnListClickProps = { isSelected: boolean } & Pick<UserList, 'id'>;

export type ListProps = {
	list: UserList;
	isSelected?: boolean;
	onClick: (props: OnListClickProps) => void;
};
