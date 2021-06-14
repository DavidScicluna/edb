import { ReactElement } from 'react';

export type OptionProps = {
  children: ReactElement;
  label: string;
  isActive?: boolean;
};
