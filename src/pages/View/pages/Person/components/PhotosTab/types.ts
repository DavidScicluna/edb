import { Image } from '../../../../../../common/types';
import { FullPerson } from '../../../../../../common/types/person';

export type PhotosTabProps = {
  name?: FullPerson['name'];
  images?: Image[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  onClickImage: (path: string) => void;
};
