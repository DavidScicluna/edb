import { ProfileProps } from '../../types';

export type BackgroundProps = Pick<ProfileProps, 'form' | 'color' | 'colorMode'> & {
	alt: string;
};
