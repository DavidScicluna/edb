import { Image } from '../../../../../../common/types';
import { FullPerson } from '../../../../../../common/types/person';

export type AssetsTabProps = {
  name?: FullPerson['name'];
  images: {
    posters?: Image[];
    backdrops?: Image[];
  };
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  onClickImage: (path: string) => void;
};
