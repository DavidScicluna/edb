import { PartialMovie } from '../../../common/types/movie';

export type PosterProps = {
  width?: string;
  isLoading: boolean;
  movie?: PartialMovie;
};
