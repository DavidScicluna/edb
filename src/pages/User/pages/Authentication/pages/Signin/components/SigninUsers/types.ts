import { User } from '../../../../../../../../store/slices/Users/types';

export type SigninUsersProps = {
	selectedUserID?: User['data']['id'];
	onUserClick: (user?: User) => void;
};
