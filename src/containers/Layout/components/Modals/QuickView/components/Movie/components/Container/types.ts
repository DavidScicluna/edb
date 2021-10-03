import { FullMovie } from '../../../../../../../../../common/types/movie';

export type ContainerProps = {
  movie?: FullMovie;
  isLoading?: boolean;
  isError?: boolean;
};
