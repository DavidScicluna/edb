import { Image } from '../../../../../../common/types';
import { FullPerson, Credits as CreditsType } from '../../../../../../common/types/person';

type Booleans = {
  person?: boolean;
  credits?: boolean;
  images?: boolean;
  taggedImages?: boolean;
};

export type OverviewTabProps = {
  person?: FullPerson;
  credits?: CreditsType;
  images?: Image[];
  taggedImages?: Image[];
  isError?: Booleans;
  isSuccess?: Booleans;
  isLoading?: Booleans;
  onClickImage: (path: string) => void;
  onChangeTab: (index: number) => void;
};
