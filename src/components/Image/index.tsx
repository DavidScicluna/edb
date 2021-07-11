import React, { ReactElement } from 'react';

import { AspectRatio, Image as CUIImage } from '@chakra-ui/react';

import utils from '../../common/utils/utils';
import Skeleton from '../Skeleton';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const { width = '', orientation, mediaType, alt, src, size, isLoaded, ...rest } = props;

  return (
    <AspectRatio
      width={width || '100%'}
      minWidth={width || '100%'}
      maxWidth={width || '100%'}
      ratio={orientation === 'horizontal' ? 16 / 9 : 2 / 3}>
      <Skeleton isLoaded={isLoaded} borderRadius='base'>
        <CUIImage
          {...rest}
          alt={alt}
          maxWidth='none'
          height='100%'
          borderRadius='base'
          src={`${process.env.REACT_APP_IMAGE_URL}/w${size}${src}`}
          fallbackSrc={utils.handleReturnFallbackSrc(mediaType, size, alt)}
        />
      </Skeleton>
    </AspectRatio>
  );
};

export default Image;
