import { Image } from '../../../../../../common/types';
import { FullPerson } from '../../../../../../common/types/person';

type Booleans = {
  images?: boolean;
  taggedImages?: boolean;
};

export type PhotosTabProps = {
  name?: FullPerson['name'];
  images?: Image[];
  taggedImages?: Image[];
  isError?: Booleans;
  isSuccess?: Booleans;
  isLoading?: Booleans;
  onClickImage: (path: string) => void;
};
