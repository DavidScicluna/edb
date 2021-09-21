import { PartialMovie } from '../../../../common/types/movie';

export type ActionsProps = {
  title?: string;
  isLoading?: boolean;
  mediaItem?: PartialMovie;
};
