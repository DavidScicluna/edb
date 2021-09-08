import React, { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import Image from '../../../Image';
import { PhotoViewerProps } from './types';

const PhotoViewer = (props: PhotoViewerProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const [isHorizontalSm] = useMediaQuery('(max-height: 500px)');

  const { name, path, mediaType } = props;

  return (
    <Image
      alt={`${name ? `"${name}"` : ''} image`}
      width={isHorizontalSm || !isSm ? 'auto' : 'calc(100% - 32px)'}
      maxWidth='none'
      height={isHorizontalSm ? 'calc(100% - 32px)' : isSm ? 'auto' : 'calc(100% - 128px)'}
      borderRadius='xl'
      mediaType={mediaType}
      src={path}
      size={{
        thumbnail: 'w92',
        full: 'original'
      }}
    />
  );
};

export default PhotoViewer;
