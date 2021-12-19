import { ReactElement } from 'react';

import { Language } from '../../../../../../../common/types';

export type List = {
  label: string;
  children?: ReactElement;
};

export type InfoProps = {
  budget?: number;
  revenue?: number;
  languages?: Language[];
  originalLanguage?: string;
  isLoading?: boolean;
};
