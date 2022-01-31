import { FullPerson } from '../../../../../../common/types/person';

export type TitleProps = {
  person?: FullPerson;
  departments?: string[];
  isLoading?: boolean;
  isQuickView?: boolean;
};
