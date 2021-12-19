import { ExternalIDs } from '../../../../common/types';
import { FullPerson } from '../../../../common/types/person';

export type DetailsProps = {
  person?: FullPerson;
  departments: string[];
  socials?: ExternalIDs;
  isLoading?: boolean;
  isError?: boolean;
  onClickPoster: (path: string) => void;
};
