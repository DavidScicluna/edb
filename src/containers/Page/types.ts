import { ReactElement } from 'react';

import { PartialLocation } from 'history';

export type Breadcrumb = {
  label: string;
  to: PartialLocation;
  isLoading?: boolean;
};

export type PageProps = {
  children: {
    actions?: ReactElement;
    body: ReactElement;
  };
  breadcrumbs: Breadcrumb[];
  title: string | ReactElement;
};
