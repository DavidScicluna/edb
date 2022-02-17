import { List } from '../../../../../../store/slices/User/types';

export type ListHeaderProps = {
	activeTab?: number;
	lists: List[];
	onListsClick: () => void;
};
