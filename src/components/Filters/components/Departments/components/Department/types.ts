import { Department } from '../../../../../../common/data/departments';

export type DepartmentProps = {
  isActive: boolean;
  onClick: (department: Department) => void;
} & Department;
