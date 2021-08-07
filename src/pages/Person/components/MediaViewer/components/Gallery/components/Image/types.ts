import { Image } from '../../../../../../../../common/types/person';

export type ImageProps = {
  image: Image;
  index: number;
  name?: string;
  isActive?: boolean;
  onClickImage: (index: number) => void;
};
