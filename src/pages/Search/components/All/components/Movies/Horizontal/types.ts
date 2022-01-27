import { PartialMovie } from '../../../../../../../common/types/movie';

export type HorizontalSearchMoviesProps = {
  query: string;
  movies?: PartialMovie[];
  total?: number;
};
