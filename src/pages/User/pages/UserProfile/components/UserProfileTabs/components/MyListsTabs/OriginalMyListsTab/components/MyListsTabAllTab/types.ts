import { SelectedList } from '../../types';

type OnTabChangeProps = { index: number };

export type MyListsTabAllTabProps = {
	selectedList: SelectedList;
	isListActionsOpen: boolean;
	onTabChange: (props: OnTabChangeProps) => void;
	onSetSelectedList: (props: SelectedList) => void;
	onEditList: () => void;
	onDeleteList: () => void;
	onListActionsOpen: () => void;
	onListActionsClose: () => void;
};
