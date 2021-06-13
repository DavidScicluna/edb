import React, { ReactElement } from 'react';

import { AspectRatio, Image as CUIImage } from '@chakra-ui/react';

import Skeleton from '../Skeleton';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const { width = '', orientation, mediaType, alt, src, size, isLoaded, ...rest } = props;

  return (
    <AspectRatio width={width || '100%'} ratio={orientation === 'horizontal' ? 16 / 9 : 2 / 3}>
      <Skeleton isLoaded={isLoaded} borderRadius='base'>
        <CUIImage
          {...rest}
          height='100%'
          alt={alt}
          borderRadius='base'
          src={`${process.env.REACT_APP_IMAGE_URL}/w${size}${src}`}
          fallbackSrc={fallbackSrc || ''}
        />
      </Skeleton>
    </AspectRatio>
  );
};

export default Image;
