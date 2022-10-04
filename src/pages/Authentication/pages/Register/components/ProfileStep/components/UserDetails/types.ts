import { ProfileProps } from '../../types';

export type UserDetailsProps = Pick<ProfileProps, 'color' | 'colorMode' | 'firstName' | 'lastName' | 'username'>;
