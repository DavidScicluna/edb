import { MediaType, ImageResponse as Image, VideoResponse as Video } from '../../common/types/types';

export type NavigationDirection = 'prev' | 'next';

export type MediaViewerType = 'photo' | 'backdrop' | 'video';

export type MediaViewerData = (Image & Video) | any;

type GetAssetType<A extends MediaViewerType | undefined> = A extends 'video' ? Video : Image;

export interface Selected {
  type?: MediaViewerType;
  asset?: GetAssetType<this['type']> | any;
}

export type MediaViewerProps = {
  isOpen: boolean;
  name?: string;
  selected?: Selected;
  photos?: Image[];
  backdrops?: Image[];
  videos?: Video[];
  mediaType: MediaType;
  onClose: () => void;
};
