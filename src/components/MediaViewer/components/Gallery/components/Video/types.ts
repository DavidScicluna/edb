import { Video } from '../../../../../../common/types';
import { GalleryProps } from '../../types';

export type GalleryVideoProps = {
	videoId: Video['key'];
	isActive?: boolean;
	onClick: () => void;
} & Omit<GalleryProps, 'activeMediaItem' | 'assets' | 'isOpen' | 'onClose' | 'onClick'>;
