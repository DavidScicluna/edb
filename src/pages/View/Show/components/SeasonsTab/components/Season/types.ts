import { PartialSeason } from '../../../../../../../common/types/tv';

export type SeasonProps = {
  tvId?: number;
  index: number;
  season: PartialSeason;
  isOpen: boolean;
  onToggle: () => void;
};
