import { ReactElement } from 'react';

import { Language, Status } from '../../../../../../../common/types';
import { CreatedBy } from '../../../../../../../common/types/tv';

export type List = {
  label: string;
  children?: ReactElement;
};

export type InfoProps = {
  createdBy?: CreatedBy[];
  languages?: Language[];
  originalLanguage?: string;
  status?: Status;
  isLoading?: boolean;
};
