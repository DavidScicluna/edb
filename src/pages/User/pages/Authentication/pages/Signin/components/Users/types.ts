import { User } from '../../../../../../../../store/slices/Users/types';
import { SignInCommonProps } from '../../common/types';

export type UsersProps = SignInCommonProps & {
	selectedUserID?: User['data']['id'];
	onUserClick: (user: User) => void;
};
