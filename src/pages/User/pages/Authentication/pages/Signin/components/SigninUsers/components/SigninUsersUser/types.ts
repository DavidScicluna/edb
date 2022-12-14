import { User } from '../../../../../../../../../../store/slices/Users/types';

export type SigninUsersUserProps = {
	user: User;
	isSelected?: boolean;
	onClick: () => void;
};
