import { Cast } from '../../../../../../../common/types/movie';

export type CastProps = {
  cast?: Cast[];
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};
