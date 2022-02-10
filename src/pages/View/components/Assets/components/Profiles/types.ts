import { Image } from '../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type ProfilesProps = {
  profiles: Image[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  isOnlyAsset?: boolean;
  onClickImage?: (path: string) => void;
} & Omit<AssetsTabProps, 'images' | 'videos' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickImage'>;
