import React, { ReactElement } from 'react';

import { useBreakpointValue } from '@chakra-ui/react';

import Image from '../../../Image';
import { BackdropViewerProps } from './types';

const BackdropViewer = (props: BackdropViewerProps): ReactElement => {
  const width = useBreakpointValue({
    'base': 'calc(100% - 2rem)',
    'sm': 'calc(100% - 2rem)',
    'md': 'calc(100% - 4rem)',
    'lg': 'calc(100% - 8rem)',
    'xl': 'calc(100% - 16rem)',
    '2xl': 'calc(100% - 32rem)'
  });

  const { name, path, mediaType } = props;

  return (
    <Image
      alt={`${name ? `"${name}"` : ''} image`}
      width={width}
      maxWidth='none'
      height='auto'
      mediaType={mediaType}
      borderRadius='xl'
      src={path}
      size={{
        thumbnail: 'w300',
        full: 'original'
      }}
    />
  );
};

export default BackdropViewer;
