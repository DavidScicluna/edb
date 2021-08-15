import { ExternalIDs, FullPerson } from '../../../../common/types/person';

export type DetailsProps = {
  person?: FullPerson;
  // totalMovieCredits: number;
  // totalTvCredits: number;
  // totalCrewCredits: number;
  departments: string[];
  socials?: ExternalIDs;
  isLoading?: boolean;
  isError?: boolean;
  onClickPoster: (path: string) => void;
};
