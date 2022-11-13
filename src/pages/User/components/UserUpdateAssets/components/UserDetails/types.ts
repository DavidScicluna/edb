import { UserUpdateAssetsProps } from '../../types';
import { UserCredentials } from '../../../../../../store/slices/Users/types';

export type UserDetailsProps = Pick<UserUpdateAssetsProps, 'color' | 'colorMode' | 'firstName' | 'lastName'> & {
	username: UserCredentials['username'];
};
