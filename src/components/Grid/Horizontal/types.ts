import { ReactElement } from 'react';

export type ScrollButtonsState = {
  left: boolean;
  right: boolean;
};

export type HorizontalGridProps = {
  children: ReactElement;
  title: string;
  footer?: string;
  isLoading: boolean;
  path: Partial<Location>;
  onFooterClick?: () => void;
};
