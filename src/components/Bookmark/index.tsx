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
  type,
  size = 'xs'
}: BookmarkProps): ReactElement => {
  const titleText: string = title ? (title.length < 25 ? title : '') : '';

  return (
    <Tooltip
      aria-label={
        isBookmarked
          ? `Remove ${titleText} ${type} from {BOOKMARK NAME} tooltip`
          : `Add ${titleText} ${type} to a bookmark tooltip`
      }
      label={isBookmarked ? `Remove ${titleText} ${type} from {BOOKMARK NAME}?` : `Add ${titleText} ${type} to a list?`}
      placement='top'
      isDisabled={isDisabled}
      gutter={6}>
      <IconButton
        aria-label={
          isBookmarked ? `Remove ${titleText} ${type} from {BOOKMARK NAME}` : `Add ${titleText} ${type} to a list`
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
