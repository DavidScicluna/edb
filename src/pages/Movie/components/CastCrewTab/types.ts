import { Cast, Crew } from '../../../../common/types/movie';

export type Department = {
  title: string;
  crew: Crew[];
};

export type CastCrewTabProps = {
  cast?: Cast[];
  crew?: Crew[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
