import React, { ReactElement } from 'react';

import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';

import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';
import { BookmarkProps } from './types';

const Bookmark = ({
  isBookmarked = false,
  isDisabled = false,
  title = 'N/A',
  mediaType,
  size = 'xs'
}: BookmarkProps): ReactElement => {
  const titleText: string = title ? (title.length < 25 ? title : '') : '';

  return (
    <Tooltip
      aria-label={
        isBookmarked
          ? `Remove ${titleText} ${mediaType} from {BOOKMARK NAME} tooltip`
          : `Add ${titleText} ${mediaType} to a bookmark tooltip`
      }
      label={
        isBookmarked
          ? `Remove ${titleText} ${mediaType} from {BOOKMARK NAME}?`
          : `Add ${titleText} ${mediaType} to a list?`
      }
      placement='top'
      isDisabled={isDisabled}
      gutter={0}>
      <IconButton
        aria-label={
          isBookmarked
            ? `Remove ${titleText} ${mediaType} from {BOOKMARK NAME}`
            : `Add ${titleText} ${mediaType} to a list`
        }
        color={isBookmarked ? 'blue' : 'gray'}
        isDisabled={isDisabled}
        icon={isBookmarked ? BookmarkOutlinedIcon : BookmarkBorderOutlinedIcon}
        size={size}
        variant='icon'
      />
    </Tooltip>
  );
};

export default Bookmark;
