import { PartialPerson } from '../../../../common/types/person';
import { Response } from '../../../../common/types/types';

export type PeopleProps = {
  people: Response<PartialPerson[]>;
  isLoading: boolean;
};
