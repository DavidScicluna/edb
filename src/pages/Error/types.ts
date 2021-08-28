import { ReactElement } from 'react';

export type ErrorProps = {
  code: number;
  title: string;
  subtitle: string;
  actions: ReactElement;
};
