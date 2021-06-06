import { ImageProps as CUIImageProps } from '@chakra-ui/react';

export type ImageProps = {
  width?: string | string[];
  orientation: 'horizontal' | 'vertical';
  alt: string;
  src: string;
  fallbackSrc?: string;
  size: string;
  isLoaded: boolean;
} & CUIImageProps;
