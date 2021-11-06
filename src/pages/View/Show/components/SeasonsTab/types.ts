import { PartialSeason } from '../../../../../common/types/tv';

export type SeasonsTabProps = {
  seasons?: PartialSeason[];
  tvId?: number;
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
