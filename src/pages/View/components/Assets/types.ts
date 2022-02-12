import { Image, Video } from '../../../../common/types';
import { AssetType } from '../../../../components/MediaViewer/types';

type Booleans = {
  images?: boolean;
  videos?: boolean;
};

export type AssetsTabProps = {
  alt?: string;
  images?: {
    profiles?: Image[];
    posters?: Image[];
    backdrops?: Image[];
  };
  videos?: Video[];
  isError: Booleans;
  isSuccess: Booleans;
  isLoading: Booleans;
  onClickAsset: (path: string, type: AssetType) => void;
};
