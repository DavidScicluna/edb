import { ColorMode, ImageProps as CUIImageProps } from '@chakra-ui/react';

import { BoringAvatarType } from '../../common/types';

export type Image = {
	alt: string;
	src: string;
	size: {
		thumbnail: string;
		full: string;
	};
};

export type ImageProps = Omit<Image, 'size' | 'src'> & {
	thumbnailSrc: string;
	fullSrc: string;
	boringType: BoringAvatarType;
	colorMode?: ColorMode;
} & Omit<CUIImageProps, 'alt' | 'src' | 'fallback' | 'fallbackSrc'>;
