import { PartialMovie } from '../../../../../../common/types/movie';

export type MoviesProps = {
  query: string;
  movies?: PartialMovie[];
  total?: number;
};
