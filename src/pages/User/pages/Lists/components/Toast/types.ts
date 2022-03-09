import { List as ListType } from '../../../../../../store/slices/Users/types';

export type ToastProps = {
	list?: ListType;
	onEdit: () => void;
	onDelete: () => void;
	onClose: () => void;
};
