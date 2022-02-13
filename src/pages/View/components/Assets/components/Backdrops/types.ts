import { Image } from '../../../../../../common/types';
import { AssetsTabProps } from '../../types';
import { AssetProps } from '../Asset/types';

export type BackdropsProps = Omit<AssetProps, 'children' | 'id' | 'title' | 'total' | 'isLoading'> & {
  backdrops: Image[];
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  onClickImage?: (path: string) => void;
} & Omit<AssetsTabProps, 'images' | 'videos' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickAsset'>;
