import { FullTV, Cast } from '../../../../../../../../common/types/tv';

export type CastProps = {
  name?: FullTV['name'];
  cast?: Cast[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  onChangeTab: () => void;
};
