import { PartialPerson } from '../../../../../../common/types/person';

export type PeopleProps = {
  query: string;
  people?: PartialPerson[];
  total?: number;
};
