import { ProfileProps } from '../../types';

export type UserBackgroundProps = Pick<ProfileProps, 'form' | 'color' | 'colorMode'> & {
	alt: string;
};
