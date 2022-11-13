import { User } from '../../../../../../../../../../store/slices/Users/types';

export type UserProps = {
	user: User;
	isSelected?: boolean;
	onClick: () => void;
};
