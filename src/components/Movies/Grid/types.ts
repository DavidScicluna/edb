import { PartialMovie } from '../../../common/types/movie';

export type GridProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  movies?: PartialMovie[];
};
