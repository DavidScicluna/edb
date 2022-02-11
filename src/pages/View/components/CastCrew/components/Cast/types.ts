import { Department, CastCrewProps, Cast } from '../../types';
import { DepartmentProps } from '../Department/types';

export type CastProps = Omit<Department, 'people'> &
  Omit<CastCrewProps, 'credits'> & {
    cast?: Cast[];
    id: string;
    title: string;
  } & Omit<DepartmentProps, 'children' | 'id' | 'title' | 'total'>;
