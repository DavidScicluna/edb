import { ReactElement } from 'react';

import { MediaType } from '../../../../common/types';
import { Header as PanelHeader } from '../../../../components/Panel/types';

export type Ref = HTMLDivElement | null;

export type Trending = {
  label: string;
  mediaType: MediaType;
  color: string;
};

export type ListProps = {
  children: ReactElement;
} & PanelHeader;
