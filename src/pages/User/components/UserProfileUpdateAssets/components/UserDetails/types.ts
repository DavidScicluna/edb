import { UpdateUserAssetsProps } from '../../types';
import { UserCredentials } from '../../../../../../store/slices/Users/types';

export type UserDetailsProps = Pick<UpdateUserAssetsProps, 'color' | 'colorMode' | 'firstName' | 'lastName'> & {
	username: UserCredentials['username'];
};
