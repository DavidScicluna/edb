import { Cast } from '../../../../../../../common/types/tv';

export type CastProps = {
  cast?: Cast[];
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  onChangeTab: () => void;
};
