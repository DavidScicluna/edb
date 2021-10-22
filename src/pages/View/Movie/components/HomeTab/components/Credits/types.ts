import { Crew } from '../../../../../../../common/types/movie';

export type Credit = {
  label: string;
  data: Crew[];
};

export type CreditsProps = {
  directors?: Crew[];
  executiveProducer?: Crew[];
  producers?: Crew[];
  writers?: Crew[];
  isLoading?: boolean;
};
