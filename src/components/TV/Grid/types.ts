import { PartialTV } from '../../../common/types/tv';

export type GridProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  tv?: PartialTV[];
};
