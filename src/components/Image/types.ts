import { ImageProps as CUIImageProps } from '@chakra-ui/react';

import { MediaType, Image as ImageType } from '../../common/types/types';

export type ImageProps = {
  thumbnailSrc: string;
  fullSrc: string;
  mediaType: MediaType;
} & Omit<CUIImageProps, 'alt' | 'src' | 'fallback' | 'fallbackSrc'> &
  Omit<ImageType, 'size' | 'src'>;
