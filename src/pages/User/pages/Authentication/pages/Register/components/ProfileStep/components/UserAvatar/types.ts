import { ProfileProps } from '../../types';

export type UserAvatarProps = Pick<ProfileProps, 'form' | 'color' | 'colorMode'> & {
	alt: string;
};
