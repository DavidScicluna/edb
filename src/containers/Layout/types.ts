import { ReactElement } from 'react';

import { Genre, Breadcrumb } from '../../common/types/types';

export type GenreResponse = {
  genres: Genre[];
};

export type LayoutProps = {
  children: ReactElement;
  breadcrumbs: Breadcrumb[];
};
