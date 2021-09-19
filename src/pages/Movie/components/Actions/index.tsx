import React, { ReactElement, useRef } from 'react';

import { useColorMode, useMediaQuery, HStack, Box } from '@chakra-ui/react';

import { useElementSize, useSelector } from '../../../../common/hooks';
import { handleReturnColor } from '../../../../common/utils';
import Bookmark from '../../../../components/Bookmark';
import Button from '../../../../components/Clickable/Button';
import Like from '../../../../components/Like';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { height } = useElementSize(ref);

  const color = useSelector((state) => state.user.ui.theme.color);

  const { title, isLoading = false, mediaItem } = props;

  return (
    <HStack
      ref={ref}
      width='100%'
      divider={<Box width='2px' height={height} backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />}
      spacing={2}>
      <Bookmark
        renderButton={({ list, isBookmarked, onClick }) => (
          <Button
            color={isBookmarked ? handleReturnColor(color) : 'gray'}
            isFullWidth={isSm}
            isDisabled={isLoading || !mediaItem}
            onClick={() => onClick()}
            size='md'
            variant='outlined'>
            {isBookmarked ? `In ${list?.label ? `"${list.label}"` : ''} list` : 'Add to a list'}
          </Button>
        )}
        title={title || ''}
        mediaType='movie'
        mediaItem={mediaItem ? { ...mediaItem } : undefined}
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
