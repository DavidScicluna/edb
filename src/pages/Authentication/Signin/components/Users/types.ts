import { User } from '../../../../../store/slices/Users/types';

export type UsersProps = {
	selectedUserID?: User['data']['id'];
	onUserClick: (user: User) => void;
};
