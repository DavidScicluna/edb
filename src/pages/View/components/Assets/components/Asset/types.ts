import { ReactElement } from 'react';

export type AssetProps = {
  children?: ReactElement;
  id?: string;
  title: string;
  total?: number;
  isOpen?: boolean;
  isLoading: boolean;
  onToggle?: () => void;
};
