import { PersonInfoProps } from '../../types';

export type PersonInfoDepartmentsProps = Pick<PersonInfoProps, 'movieDepartments' | 'tvShowDepartments'>;
