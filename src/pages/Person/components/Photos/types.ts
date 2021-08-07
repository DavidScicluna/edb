import { Image } from '../../../../common/types/person';

export type PhotosProps = {
  images: Image[];
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  onClickImage: (image?: Image) => void;
};
