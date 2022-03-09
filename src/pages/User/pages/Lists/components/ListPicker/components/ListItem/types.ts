import { List } from '../../../../../../../../store/slices/Users/types';

export type ListItemProps = {
	isSelected?: boolean;
	onSelected: (id: List['id']) => void;
	onClick: (id: List['id']) => void;
} & List;
