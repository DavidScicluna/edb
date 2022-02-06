import { ReactElement } from 'react';

import { Crew } from '../../../../../../../../common/types/movie';

export type ListItem = {
  label: string;
  children?: ReactElement;
};

export type CreditsProps = {
  directors?: Crew[];
  executiveProducers?: Crew[];
  producers?: Crew[];
  writers?: Crew[];
  isLoading?: boolean;
};
