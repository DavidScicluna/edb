import { ReactElement } from 'react';

import { CreatedBy } from '../../../../../../../common/types/tv';
import { Language, Status } from '../../../../../../../common/types/types';

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
