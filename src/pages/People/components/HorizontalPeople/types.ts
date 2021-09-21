import { PartialPerson } from '../../../../common/types/person';

export type HorizontalPeopleProps = {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  people?: PartialPerson[];
};
