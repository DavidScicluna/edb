import { Crew } from '../../types';

export type CrewProps = {
  crew?: Crew;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};
