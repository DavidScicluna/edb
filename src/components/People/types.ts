import { PartialPerson } from '../../common/types/person';

export type PeopleProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  people?: PartialPerson[];
};
