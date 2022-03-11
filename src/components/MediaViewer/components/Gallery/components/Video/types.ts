import { ColorMode } from '@chakra-ui/react';

import { Video } from '../../../../../../common/types';
import { GalleryProps } from '../../types';

export type GalleryVideoProps = {
	videoId: Video['key'];
	colorMode: ColorMode;
	isActive?: boolean;
	onClick: () => void;
} & Omit<GalleryProps, 'activeMediaItem' | 'assets' | 'isOpen' | 'onClose' | 'onClick'>;
