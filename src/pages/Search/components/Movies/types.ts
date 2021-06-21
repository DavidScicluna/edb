import { PartialMovie } from '../../../../common/types/movie';
import { Response } from '../../../../common/types/types';

export type MovieProps = {
  movies: Response<PartialMovie[]>;
  isLoading: boolean;
};
