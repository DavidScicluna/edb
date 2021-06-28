import { PartialPerson } from '../../../common/types/person';

export type GridProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  people?: PartialPerson[];
};
