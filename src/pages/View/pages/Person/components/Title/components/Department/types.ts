import { RenderProps } from '../../../../../../components/Title/types';

export type DepartmentProps = {
  department?: string;
  isLoading?: boolean;
} & Omit<RenderProps, 'fontWeight'>;
