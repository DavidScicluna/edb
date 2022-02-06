import { Cast, FullMovie } from '../../../../../../../../common/types/movie';

export type CastProps = {
  title?: FullMovie['title'];
  cast?: Cast[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  onChangeTab: () => void;
};
