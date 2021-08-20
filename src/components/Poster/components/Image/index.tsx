import React, { ReactElement } from 'react';

import { AspectRatio } from '@chakra-ui/react';

import Image from '../../../Image';
import Skeleton from '../../../Skeleton';
import { PosterImageProps } from './types';

const PosterImage = (props: PosterImageProps): ReactElement => {
  const { width = '', orientation, mediaType, alt, src, size, isLoading, ...rest } = props;

  return (
    <AspectRatio
      width={width || '100%'}
      minWidth={width || '100%'}
      maxWidth={width || '100%'}
      ratio={orientation === 'horizontal' ? 16 / 9 : 2 / 3}>
      <Skeleton isLoaded={!isLoading} borderRadius='base'>
        <Image
          {...rest}
          alt={alt}
          mediaType={mediaType}
          maxWidth='none'
          height='100%'
          borderRadius='base'
          src={src}
          size={size}
        />
      </Skeleton>
    </AspectRatio>
  );
};

export default PosterImage;
