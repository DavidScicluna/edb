import { ProfileProps } from '../../types';

export type DetailsProps = Omit<ProfileProps, 'id' | 'form' | 'color' | 'onChange'>;
