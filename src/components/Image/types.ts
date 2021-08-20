import { ImageProps as CUIImageProps } from '@chakra-ui/react';

import { MediaType, Image as ImageType } from '../../common/types/types';

export type ImageProps = {
  mediaType: MediaType;
} & Omit<CUIImageProps, 'alt'> &
  ImageType;
