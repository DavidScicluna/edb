import { ReactElement } from 'react';

import { Location } from 'history';


export type Breadcrumb = {
  label: string;
  to: Partial<Location>;
  isLoading?: boolean;
};

export type PageProps = {
  children: {
    actions?: ReactElement;
    body: ReactElement;
  };
  title?: string | ReactElement;
};
