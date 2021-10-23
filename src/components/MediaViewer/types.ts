import { MediaType, ImageResponse as Image, Video } from '../../common/types/types';

export type NavigationDirection = 'prev' | 'next';

export type MediaViewerType = 'photo' | 'backdrop' | 'video';

export type MediaViewerData = (Image & Video) | any;

export interface Selected {
  type?: MediaViewerType;
  asset?: string; // Path
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
