import { User } from '../../../../../../../store/slices/Users/types';

export type UserProps = {
	user: User;
	isActive?: boolean;
	onClick: () => void;
};
