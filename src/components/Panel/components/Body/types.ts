import { ReactElement } from 'react';

import { Size } from '../../types';

export type BodyProps = {
  children: ReactElement;
  hasHeader?: boolean;
  hasFooter?: boolean;
  size: Size;
};
