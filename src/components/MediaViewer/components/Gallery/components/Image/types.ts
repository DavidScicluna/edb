import { Image } from '../../../../../../common/types';
import { MediaItem } from '../../../../types';
import { GalleryProps } from '../../types';

export type GalleryImageProps = Omit<MediaItem, 'type' | 'data'> & {
  path: Image['file_path'];
  isActive?: boolean;
  onClick: () => void;
} & Omit<GalleryProps, 'activeMediaItem' | 'assets' | 'isOpen' | 'onClose' | 'onClick'>;
