import { Image } from '../../../../../../common/types';
import { FullPerson, Credits as CreditsType } from '../../../../../../common/types/person';

type Booleans = {
  person?: boolean;
  credits?: boolean;
  images?: boolean;
};

export type OverviewProps = {
  person?: FullPerson;
  credits?: CreditsType;
  images?: Image[];
  isError?: Booleans;
  isSuccess?: Booleans;
  isLoading?: Booleans;
  onClickImage: (path: string) => void;
  onChangeTab: (index: number) => void;
};
