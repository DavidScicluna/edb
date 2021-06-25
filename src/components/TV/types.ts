import { PartialTV } from '../../common/types/tv';

export type TVProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  tv?: PartialTV[];
};
