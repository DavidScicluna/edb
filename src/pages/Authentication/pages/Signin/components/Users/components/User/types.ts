import { User } from '../../../../../../../../store/slices/Users/types';
import { UsersProps } from '../../types';

export type UserProps = Pick<UsersProps, 'color' | 'colorMode'> & {
	user: User;
	isSelected?: boolean;
	onClick: () => void;
};
