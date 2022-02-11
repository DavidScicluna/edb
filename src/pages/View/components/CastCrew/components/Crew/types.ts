import { Department, CastCrewProps, Crew } from '../../types';
import { DepartmentProps } from '../Department/types';

export type CrewProps = Omit<Department, 'people'> &
  Omit<CastCrewProps, 'credits'> & {
    crew?: Crew[];
    id: string;
    title: string;
  } & Omit<DepartmentProps, 'children' | 'id' | 'title' | 'total'>;
