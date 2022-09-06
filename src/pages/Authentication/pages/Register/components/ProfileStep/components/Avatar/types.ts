import { ProfileProps } from '../../types';

export type AvatarProps = Pick<ProfileProps, 'form' | 'color' | 'colorMode'> & {
	alt: string;
};
