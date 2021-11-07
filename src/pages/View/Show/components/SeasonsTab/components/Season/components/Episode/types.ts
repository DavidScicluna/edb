import { Episode } from '../../../../../../../../../common/types/tv';

export type EpisodeProps = {
  tvId?: number;
  seasonNumber?: number;
  episode?: Episode;
  isLoading: boolean;
};
