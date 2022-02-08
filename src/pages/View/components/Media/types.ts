import { MediaType, Image, Video } from '../../../../common/types';
import { AssetType as MediaViewerAssetType } from '../../../../components/MediaViewer/types';

export type AssetType = 'poster' | 'backdrop' | 'logo' | 'video';

export type Asset = {
  label: string;
  type: AssetType;
  isDisabled?: boolean;
  data: (Image & Video)[];
};

export type Status = {
  images?: boolean;
  videos?: boolean;
};

export type MediaProps = {
  alt?: string;
  assets: Asset[];
  mediaType: Omit<MediaType, 'company'>;
  isError: Status;
  isSuccess: Status;
  isLoading: Status;
  onAssetClick: (path: string, type: MediaViewerAssetType) => void;
  onFooterClick: () => void;
};
