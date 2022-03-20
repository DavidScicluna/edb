import { ProfileProps } from '../../types';

export type BackgroundProps = {
	alt: string;
	background?: string;
} & Omit<ProfileProps, 'id' | 'user' | 'onChange'>;
