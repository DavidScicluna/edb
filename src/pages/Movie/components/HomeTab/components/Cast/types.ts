import { Cast } from '../../../../../../common/types/movie';

export type CastProps = {
  cast?: Cast[];
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  onViewCastCrewTab: () => void;
};
