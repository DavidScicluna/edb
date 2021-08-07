import { Image } from '../../../../../../common/types/person';

export type ImageProps = {
  image?: Image;
  name?: string;
  isLoading?: boolean;
  onClickImage: (image: Image) => void;
};
