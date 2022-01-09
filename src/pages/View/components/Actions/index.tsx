import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, HStack, Box } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';
import Bookmark from '../../../../components/Clickable/Bookmark';
import Button from '../../../../components/Clickable/Button';
import Like, { handleReturnIcon } from '../../../../components/Clickable/Like';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [ref, { height }] = useElementSize();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { mediaItem, mediaType, title, isLoading = true, isError = false } = props;

  const isDisabled: boolean = isError || isLoading || !mediaItem;

  return (
    <HStack
      ref={ref}
      width={isSm ? '100%' : 'auto'}
      divider={<Box width='2px' height={height} backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />}
      spacing={2}
    >
      <Bookmark
        renderButton={({ lists, isBookmarked, onClick }) => (
          <Button
            color={isBookmarked ? color : 'gray'}
            isFullWidth={isSm}
            isDisabled={isDisabled}
            onClick={() => onClick()}
            size='md'
            variant='outlined'
          >
            {isBookmarked
              ? `In ${
                  lists && (lists?.length || 0) === 1 ? `${lists[0].label ? `"${lists[0].label}" list` : ''}` : 'lists'
                }`
              : 'Add to a list'}
          </Button>
        )}
        title={title || ''}
        mediaType={mediaType}
        mediaItem={mediaItem ? { ...mediaItem } : undefined}
      />
      <Like
        renderButton={({ isLiked, onClick }) => (
          <Button
            color={isLiked ? 'red' : 'gray'}
            renderLeftIcon={({ fontSize }) => handleReturnIcon(isLiked, fontSize)}
            isFullWidth={isSm}
            isDisabled={isDisabled}
            onClick={() => onClick()}
            size='md'
            variant='outlined'
          >
            {isLiked ? 'Liked' : 'Like'}
          </Button>
        )}
        mediaType={mediaType}
        mediaItem={mediaItem ? { ...mediaItem } : undefined}
      />
    </HStack>
  );
};

export default Actions;
