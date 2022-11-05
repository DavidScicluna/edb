import { UserList } from '../../../../../../../../../../../store/slices/Users/types';

export type MyListsTabListTabStatus = 'empty' | 'loading' | 'multiple' | 'single' | 'hidden';

export type MyListsTabListTabProps = {
	list?: UserList;
	onEditList: () => void;
	onDeleteList: () => void;
};
