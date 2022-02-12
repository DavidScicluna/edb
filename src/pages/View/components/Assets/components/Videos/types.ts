import { Video } from '../../../../../../common/types';
import { AssetsTabProps } from '../../types';
import { AssetProps } from '../Asset/types';

export type VideosProps = Omit<AssetProps, 'children' | 'id' | 'title' | 'total' | 'isLoading'> & {
  videos: Video[];
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isOnlyAsset?: boolean;
  onClickVideo?: (videoId: string) => void;
} & Omit<AssetsTabProps, 'images' | 'videos' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickAsset'>;
