import { ReactElement, useRef } from 'react';

import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon
} from '@material-ui/icons';

import { useColorMode, useMediaQuery, HStack, Box } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';
import { handleReturnColor } from '../../../../common/utils';
import Bookmark from '../../../../components/Clickable/Bookmark';
import Button from '../../../../components/Clickable/Button';
import Like from '../../../../components/Clickable/Like';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { height } = useElementSize(ref);

  const color = useSelector((state) => state.user.ui.theme.color);

  const { mediaItem, mediaType, title, isLoading = true, isError = false } = props;

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
            color={isBookmarked ? handleReturnColor(color) : 'gray'}
            isFullWidth={isSm}
            isDisabled={isError || isLoading || !mediaItem}
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
            isFullWidth={isSm}
            isDisabled={isError || isLoading || !mediaItem}
            leftIcon={isLiked ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon}
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
