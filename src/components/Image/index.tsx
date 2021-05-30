import React, { ReactElement } from 'react';

import { AspectRatio, Image as CUIImage, ImageProps as CUIImageProps } from '@chakra-ui/react';

import Skeleton from '../Skeleton';

interface ImageProps extends CUIImageProps {
  orientation: 'horizontal' | 'vertical';
  alt: string;
  src: string;
  fallbackSrc?: string;
  size: string;
  isLoaded: boolean;
}

const Image = (props: ImageProps): ReactElement => {
  const { orientation, alt, src, fallbackSrc, size, isLoaded, ...rest } = props;

  return (
    <Skeleton isLoaded={isLoaded} borderRadius='base'>
      <AspectRatio ratio={orientation === 'horizontal' ? 16 / 9 : 2 / 3} minWidth={`${size}px`}>
        <CUIImage
          {...rest}
          alt={alt}
          borderRadius='base'
          src={`${process.env.REACT_APP_IMAGE_URL}w${size}${src}`}
          fallbackSrc={fallbackSrc || ''}
        />
      </AspectRatio>
    </Skeleton>
  );
};

export default Image;
