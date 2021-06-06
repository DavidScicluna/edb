import { ReactElement, Ref } from 'react';

export type GridProps = {
  children: ReactElement;
  gridRef: Ref<HTMLDivElement> | undefined;
  handleScrollChange: (event: any) => void;
};
