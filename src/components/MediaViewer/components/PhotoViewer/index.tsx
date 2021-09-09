import React, { ReactElement } from 'react';

import { useBreakpointValue } from '@chakra-ui/react';

import Image from '../../../Image';
import { PhotoViewerProps } from './types';

const PhotoViewer = (props: PhotoViewerProps): ReactElement => {
  const width = useBreakpointValue({
    'base': 'calc(100% - 2rem)',
    'sm': 'auto',
    'md': 'auto',
    'lg': 'auto',
    'xl': 'auto',
    '2xl': 'auto'
  });
  const height = useBreakpointValue({
    'base': 'auto',
    'sm': 'calc(100% - 6rem)',
    'md': 'calc(100% - 8rem)',
    'lg': 'calc(100% - 10rem)',
    'xl': 'calc(100% - 12rem)',
    '2xl': 'calc(100% - 14rem)'
  });

  const { name, path, mediaType } = props;

  return (
    <Image
      alt={`${name ? `"${name}"` : ''} image`}
      width={width}
      maxWidth='none'
      height={height}
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
