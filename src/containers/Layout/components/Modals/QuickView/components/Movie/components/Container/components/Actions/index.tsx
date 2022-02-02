import { ReactElement } from 'react';

import { useColorMode, HStack, Box } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../../../../../../../../common/hooks';
import Bookmark from '../../../../../../../../../../../components/Clickable/Bookmark';
import Button from '../../../../../../../../../../../components/Clickable/Button';
import Like, { handleReturnIcon } from '../../../../../../../../../../../components/Clickable/Like';
import Divider from '../../../../../../../../../../../components/Divider';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const { colorMode } = useColorMode();

  const [ref, { height }] = useElementSize();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { title, isLoading = false, mediaItem } = props;

  const isDisabled: boolean = isLoading || !mediaItem;

  return (
    <HStack ref={ref} width='100%' divider={<Divider orientation='vertical' height={`${height}px`} />} spacing={2}>
      <Bookmark
        renderButton={({ lists, isBookmarked, onClick }) => (
          <Button
            color={isBookmarked ? color : 'gray'}
            isFullWidth
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
        mediaType='movie'
        mediaItem={mediaItem ? { ...mediaItem } : undefined}
      />
      <Like
        renderButton={({ isLiked, onClick }) => (
          <Button
            color={isLiked ? 'red' : 'gray'}
            renderLeftIcon={({ fontSize }) => handleReturnIcon(isLiked, fontSize)}
            isFullWidth
            isDisabled={isDisabled}
            onClick={() => onClick()}
            size='md'
            variant='outlined'
          >
            {isLiked ? 'Liked' : 'Like'}
          </Button>
        )}
        mediaType='movie'
        mediaItem={mediaItem ? { ...mediaItem } : undefined}
      />
    </HStack>
  );
};

export default Actions;
