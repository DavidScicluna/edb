import React, { ReactElement, useRef } from 'react';

import { useColorMode, HStack, Box } from '@chakra-ui/react';

import { useElementSize } from '../../../../common/hooks';
import Bookmark from '../../../../components/Bookmark';
import Like from '../../../../components/Like';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { colorMode } = useColorMode();

  const { height } = useElementSize(ref);

  const { title, isLoading = false, mediaItem } = props;

  return (
    <HStack
      ref={ref}
      width='100%'
      divider={<Box width='2px' height={height} backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />}
      spacing={2}>
      <Bookmark
        buttonType='button'
        isDisabled={isLoading}
        title={title || ''}
        mediaType='movie'
        mediaItem={mediaItem ? { ...mediaItem } : undefined}
        size='md'
      />
      <Like
        buttonType='button'
        isDisabled={isLoading}
        title={title || ''}
        mediaType='movie'
        mediaItem={mediaItem ? { ...mediaItem } : undefined}
        size='md'
      />
    </HStack>
  );
};

export default Actions;
