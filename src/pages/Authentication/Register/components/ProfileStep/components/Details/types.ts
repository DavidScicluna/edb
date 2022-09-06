import { ProfileProps } from '../../types';

export type DetailsProps = Pick<ProfileProps, 'color' | 'colorMode' | 'firstName' | 'lastName' | 'username'>;
