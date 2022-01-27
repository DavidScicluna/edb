import { PartialPerson } from '../../../../../../../common/types/person';

export type HorizontalSearchPeopleProps = {
  query: string;
  people?: PartialPerson[];
  total?: number;
};
