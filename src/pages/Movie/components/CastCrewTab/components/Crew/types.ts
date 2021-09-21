import { Crew } from '../../../../../../common/types/movie';

export type CrewProps = {
  crew?: Crew[];
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};
