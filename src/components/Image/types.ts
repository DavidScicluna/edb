import { ImageProps as CUIImageProps } from '@chakra-ui/react';

import { MediaType } from '../../common/types/types';

export type ImageProps = {
  width?: string | string[];
  orientation: 'horizontal' | 'vertical';
  mediaType: MediaType;
  alt: string;
  src: string;
  size: string;
  isLoading: boolean;
} & Omit<CUIImageProps, 'fallback' | 'fallbackSrc'>;
