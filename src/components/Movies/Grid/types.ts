import { PartialMovie } from '../../../common/types/movie';

export type GridProps = {
  isError: boolean;
  isSuccess: boolean;
  movies?: PartialMovie[];
};
