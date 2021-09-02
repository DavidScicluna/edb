import { Profile } from '../../../../../../common/types/person';

export type ImageProps = {
  image?: Profile;
  name?: string;
  isLoading?: boolean;
  onClickImage: (image: Profile) => void;
};
