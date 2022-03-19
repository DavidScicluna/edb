import { User, Credentials } from '../../../../../../../store/slices/Users/types';

export type UsersProps = {
	users: User[];
	onUserClick: (credentials: Credentials) => void;
};
