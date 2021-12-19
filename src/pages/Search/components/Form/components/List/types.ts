import { ReactElement } from 'react';

import { MediaType } from '../../../../../../common/types';

export type Trending = {
  label: string;
  mediaType: MediaType;
  color: string;
};

export type ListProps = {
  children: ReactElement;
  title?: string;
  actions?: ReactElement;
};
