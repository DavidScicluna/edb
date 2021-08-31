import { FullPerson } from '../../../../../../../../../common/types/person';

export type ContainerProps = {
  person?: FullPerson;
  totalMovieCredits: number;
  totalTvCredits: number;
  totalCrewCredits: number;
  departments: string[];
  isLoading?: boolean;
  isError?: boolean;
};
