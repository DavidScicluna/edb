import { ReactElement } from 'react';

import { FullTV, Crew } from '../../../../../../../../common/types/tv';

export type ListItem = {
  label: string;
  children?: ReactElement;
};

export type CreditsProps = {
  show?: FullTV;
  crew?: Crew[];
  isLoading?: boolean;
};
