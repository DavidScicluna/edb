import { DepartmentProps } from '../../types';

export type GridProps = Omit<DepartmentProps, 'id' | 'title' | 'total' | 'isOpen' | 'isLoading' | 'onToggle'>;
