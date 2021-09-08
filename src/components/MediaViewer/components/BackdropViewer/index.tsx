import React, { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import Image from '../../../Image';
import { BackdropViewerProps } from './types';

const BackdropViewer = (props: BackdropViewerProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const [isHorizontalSm] = useMediaQuery('(max-height: 500px)');

  const { name, path, mediaType } = props;

  return (
    <Image
      alt={`${name ? `"${name}"` : ''} image`}
      width={isHorizontalSm ? 'auto' : isSm ? 'calc(100% - 32px)' : 'calc(100% - 128px)'}
      height={isHorizontalSm ? 'calc(100% - 112px)' : 'auto'}
      maxWidth='none'
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
