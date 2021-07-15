import { ReactElement } from 'react';

import { Theme } from '../../../../../../../store/slices/User/types';

export type ContainerProps = {
  children: ReactElement;
  title: string;
  colorMode: Theme['background'];
};
