import { ReactElement } from 'react';

export type ChildProps = {
  children: ReactElement;
  divider?: ReactElement;
  itemId: string;
  isLast: boolean;
};
