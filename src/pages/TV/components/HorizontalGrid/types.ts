import { PartialTV } from '../../../../common/types/tv';

export type HomeHorizontalGridProps = {
  tv?: PartialTV[];
  title: string;
  pathname: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};
