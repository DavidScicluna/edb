import { ReactElement } from 'react';

export type DescriptionRef = HTMLDivElement | null;

export type ErrorProps = {
  code: number;
  title: string;
  subtitle: string;
  actions?: ReactElement;
};
