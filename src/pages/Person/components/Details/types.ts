import { FullPerson } from '../../../../common/types/person';
import { ExternalIDs } from '../../../../common/types/types';

export type DetailsProps = {
  person?: FullPerson;
  departments: string[];
  socials?: ExternalIDs;
  isLoading?: boolean;
  isError?: boolean;
  onClickPoster: (path: string) => void;
};
