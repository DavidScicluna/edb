import { Episode } from '../../../../../../../../../../../common/types/tv';

export type EpisodeModalProps = {
  tvId: number;
  seasonNumber: number;
  episode: Episode;
  isOpen: boolean;
  onClose: () => void;
};
