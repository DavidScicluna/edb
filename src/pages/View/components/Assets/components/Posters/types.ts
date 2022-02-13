import { Image } from '../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type PostersProps = {
  posters: Image[];
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  onClickImage?: (path: string) => void;
} & Omit<AssetsTabProps, 'images' | 'videos' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickAsset'>;
