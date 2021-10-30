import { ReactElement } from 'react';

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
    'sm': 'calc(100% - 8rem)',
    'md': 'calc(100% - 6rem)',
    'lg': 'calc(100% - 6rem)',
    'xl': 'calc(100% - 6rem)',
    '2xl': 'calc(100% - 8rem)'
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
      thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w92${path}`}
      fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${path}`}
    />
  );
};

export default PhotoViewer;
