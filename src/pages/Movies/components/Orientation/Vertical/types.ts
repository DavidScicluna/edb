import { PartialMovie } from '../../../../../common/types/movie';

export type VerticalMoviesProps = {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  movies?: PartialMovie[];
};
