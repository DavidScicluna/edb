import { ReactElement } from 'react';

export type PanelProps = {
  children: ReactElement;
  footer?: ReactElement;
  id: string;
  title: string;
  total: number;
  isOpen: boolean;
  onToggle: () => void;
};
