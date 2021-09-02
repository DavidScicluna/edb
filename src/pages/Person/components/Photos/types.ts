import { Profile } from '../../../../common/types/person';

export type PhotosProps = {
  images: Profile[];
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  onClickImage: (image?: Profile) => void;
};
