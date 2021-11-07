import { EpisodeCredits } from '../../../../../../../../../../../../../common/types/tv';

export type CrewProps = {
  crew?: EpisodeCredits['crew'];
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
