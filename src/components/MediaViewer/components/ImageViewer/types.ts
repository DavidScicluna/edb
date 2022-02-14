import { Image } from '../../../../common/types';
import { MediaItem, MediaViewerProps } from '../../types';

export type ImageViewerProps = Omit<MediaItem, 'type' | 'data'> &
  Image &
  Omit<MediaViewerProps, 'assets' | 'selectedPath' | 'isOpen' | 'onClose'>;
