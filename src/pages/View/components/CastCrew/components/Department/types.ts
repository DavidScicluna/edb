import { ReactElement } from 'react';

export type DepartmentProps = {
  children?: ReactElement;
  id?: string;
  title: string;
  total?: number;
  isOpen?: boolean;
  isLoading: boolean;
  onToggle?: () => void;
};
