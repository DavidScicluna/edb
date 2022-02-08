import { PartialMovie } from '../../../../../../common/types/movie';

export type PartsTabProps = {
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  parts: PartialMovie[];
};
