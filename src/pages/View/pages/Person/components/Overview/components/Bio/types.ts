import { FullPerson } from '../../../../../../../../common/types/person';

export type BioProps = {
  biography: FullPerson['biography'];
  isLoading?: boolean;
};
