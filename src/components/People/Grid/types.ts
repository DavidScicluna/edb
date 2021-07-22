import { PartialPerson } from '../../../common/types/person';

export type GridProps = {
  isError: boolean;
  isSuccess: boolean;
  people?: PartialPerson[];
};
