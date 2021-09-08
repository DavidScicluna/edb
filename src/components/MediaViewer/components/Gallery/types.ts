import { MediaViewerProps, MediaViewerType } from '../../types';

export type GalleryProps = {
  isOpen: boolean;
  activePath: string;
  onClick: (path: string, type: MediaViewerType) => void;
  onClose: () => void;
} & Omit<MediaViewerProps, 'isOpen' | 'selected' | 'onClose'>;
