import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import { Bookmark as BookmarkIcon } from 'react-feather';

import { useSelector } from '../../../../common/hooks';
import { MediaType } from '../../../../common/types';
import { handleReturnColor } from '../../../../common/utils';
import Bookmark from '../../../Clickable/Bookmark';
import IconButton from '../../../Clickable/IconButton';
import Tooltip from '../../../Tooltip';
import { PosterBookmarkProps } from './types';

const PosterBookmark = <MT extends MediaType>(props: PosterBookmarkProps<MT>): ReactElement => {
  const [isHovering, setIsHovering] = useBoolean();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { title, mediaType, mediaItem, isLoading = true, size } = props;

  return (
    <Bookmark
      renderButton={({ lists, isBookmarked, onClick }) => (
        <Tooltip
          aria-label={
            isBookmarked
              ? `Remove "${title}" ${mediaType} from ${
                  lists && (lists?.length || 0) === 1 ? `${lists[0].label ? `"${lists[0].label}" list` : ''}` : 'lists'
                } (tooltip)`
              : `Add "${title}" ${mediaType} to a list (tooltip)`
          }
          label={
            isBookmarked
              ? `Remove "${title}" from ${
                  lists && (lists?.length || 0) === 1 ? `${lists[0].label ? `"${lists[0].label}" list` : ''}` : 'lists'
                }`
              : `Add "${title}" to a list`
          }
          placement='top'
          isOpen={isHovering}
          isDisabled={isLoading || !mediaItem}
          gutter={8}>
          <IconButton
            aria-label={
              isBookmarked
                ? `Remove "${title}" ${mediaType} from ${
                    lists && (lists?.length || 0) === 1
                      ? `${lists[0].label ? `"${lists[0].label}" list` : ''}`
                      : 'lists'
                  } (tooltip)`
                : `Add "${title}" ${mediaType} to a list (tooltip)`
            }
            color={isBookmarked ? handleReturnColor(color) : 'gray'}
            isDisabled={isLoading || !mediaItem}
            // icon={isBookmarked ? BookmarkOutlinedIcon : BookmarkBorderOutlinedIcon}
            icon={BookmarkIcon}
            onClick={() => onClick()}
            onMouseEnter={() => setIsHovering.on()}
            onMouseLeave={() => setIsHovering.off()}
            size={size}
            variant='icon'
          />
        </Tooltip>
      )}
      title={title}
      mediaType={mediaType}
      mediaItem={mediaItem}
    />
  );
};

export default PosterBookmark;
