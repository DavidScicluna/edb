import { List } from '../../../../../../store/slices/Users/types';

export type ListHeaderProps = {
	activeTab?: number;
	lists: List[];
	onListsClick: () => void;
};
