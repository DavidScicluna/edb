import { ReactElement } from 'react';

import { Crew } from '../../../../common/types/movie';
import { Language } from '../../../../common/types/types';

type Status = {
  details?: boolean;
  credits?: boolean;
};

export type DetailsProps = {
  renderCover: ReactElement;
  tagline?: string | null;
  overview?: string | null;
  directors?: Crew[];
  executiveProducer?: Crew[];
  producers?: Crew[];
  writers?: Crew[];
  budget?: number;
  revenue?: number;
  languages?: Language[];
  originalLanguage?: string;
  isLoading?: Status;
};
