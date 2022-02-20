import { MediaViewerProps, MediaItem } from '../../types';

export type GalleryProps = {
	activeMediaItem?: MediaItem;
	onClick: (mediaItem: MediaItem) => void;
} & Omit<MediaViewerProps, 'selectedPath'>;
