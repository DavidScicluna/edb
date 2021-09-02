import { Profile } from '../../../../../../../../common/types/person';

export type ImageProps = {
  image: Profile;
  index: number;
  name?: string;
  isActive?: boolean;
  onClickImage: (index: number) => void;
};
