import { FullPerson } from '../../../../../../../../common/types/person';

export type DateProps = {
  birthday?: FullPerson['birthday'];
  place_of_birth?: FullPerson['place_of_birth'];
  deathday?: FullPerson['deathday'];
  isLoading?: boolean;
  isQuickView?: boolean;
};
