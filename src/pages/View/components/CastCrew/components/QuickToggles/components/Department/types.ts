import { Department } from '../../../../types';

export type DepartmentProps = {
  department?: Department;
  isLoading?: boolean;
  isDisabled?: boolean;
  onTogglePanel: () => void;
};
