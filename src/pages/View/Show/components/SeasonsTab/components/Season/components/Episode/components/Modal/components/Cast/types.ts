import { EpisodeCredits } from '../../../../../../../../../../../../../common/types/tv';

export type CastProps = {
  title: string;
  cast?: EpisodeCredits['cast'];
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
