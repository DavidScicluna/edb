import { DepartmentProps } from '../../types';

export type HeaderProps = Omit<DepartmentProps, 'children' | 'id'>;
