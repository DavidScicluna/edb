import { PartialMovie } from '../../common/types/movie';

export type MovieProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  movies?: PartialMovie[];
};
