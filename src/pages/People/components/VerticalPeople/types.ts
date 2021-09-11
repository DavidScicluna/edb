import { PartialPerson } from '../../../../common/types/person';

export type VerticalPeopleProps = {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  people?: PartialPerson[];
};
