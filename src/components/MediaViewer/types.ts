import { BoringAvatarType, Image, Video } from '../../common/types';

export type NavigationDirection = 'prev' | 'next';

export type AssetType = 'image' | 'video';

// export type GetAssetType<A extends AssetType> = A extends 'image' ? ;

export type MediaItem = {
  type: AssetType;
  boringType: BoringAvatarType;
  srcSize: [string, string];
  data: Image & Video;
};

export type Asset = { label: string; mediaItems: MediaItem[] };

export type MediaViewerProps = {
  alt?: string;
  assets: Asset[];
  selectedPath?: string;
  isOpen: boolean;
  onClose: () => void;
};
