import { ProfileProps } from '../../types';

export type AvatarProps = {
	alt: string;
	avatar?: string;
} & Omit<ProfileProps, 'id' | 'user' | 'onChange'>;
