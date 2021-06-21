import { ReactElement } from 'react';

export type EmptyProps = {
  button?: ReactElement;
  hasIllustration?: boolean;
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outlined' | 'transparant';
};
