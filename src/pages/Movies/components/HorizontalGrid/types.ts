import { PartialMovie } from '../../../../common/types/movie';

export type HomeHorizontalGridProps = {
  movies?: PartialMovie[];
  title: string;
  pathname: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};
