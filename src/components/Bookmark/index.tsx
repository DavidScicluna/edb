import React, { ReactElement, useState } from 'react';

import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  BookmarkOutlined as BookmarkOutlinedIcon
} from '@material-ui/icons/';
import { useDispatch } from 'react-redux';

import useSelector from '../../common/hooks/useSelectorTyped';
import utils from '../../common/utils/utils';
import { setLists, toggleList } from '../../store/slices/User';
import IconButton from '../Clickable/IconButton';
import Tooltip from '../Tooltip';
import { BookmarkProps } from './types';

const Bookmark = ({ isDisabled = false, mediaItem, size = 'xs' }: BookmarkProps): ReactElement => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.user.data.lists);
  const color = useSelector((state) => state.user.ui.theme.color);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const list = lists.find((list) => list.results.some((result) => result.id === mediaItem.id));
  const isBookmarked: boolean = list ? list.results.some((result) => result.id === mediaItem.id) : false;

  return (
    <Tooltip
      aria-label={
        isBookmarked
          ? `Remove "${mediaItem.title}" ${mediaItem.mediaType} from ${list?.label ? `"${list.label}"` : ''} (tooltip)`
          : `Add "${mediaItem.title}" ${mediaItem.mediaType} to a list (tooltip)`
      }
      label={
        isBookmarked
          ? `Remove "${mediaItem.title}" from ${list?.label ? `"${list.label}"` : ''} list`
          : `Add "${mediaItem.title}" to a list`
      }
      placement='top'
      isOpen={isHovering}
      isDisabled={isDisabled}
      gutter={0}>
      <IconButton
        aria-label={
          isBookmarked
            ? `Remove "${mediaItem.title}" ${mediaItem.mediaType} from ${
                list?.label ? `"${list.label}"` : ''
              } (tooltip)`
            : `Add "${mediaItem.title}" ${mediaItem.mediaType} to a list (tooltip)`
        }
        color={isBookmarked ? utils.handleReturnColor(color) : 'gray'}
        isDisabled={isDisabled}
        icon={isBookmarked ? BookmarkOutlinedIcon : BookmarkBorderOutlinedIcon}
        onClick={
          isBookmarked && list
            ? () =>
                dispatch(
                  setLists(
                    lists.map((paramList) =>
                      paramList.id === list.id
                        ? {
                            ...paramList,
                            results: paramList.results.filter((result) => result.id !== mediaItem.id)
                          }
                        : paramList
                    )
                  )
                )
            : () =>
                dispatch(
                  toggleList({
                    open: true,
                    item: { id: mediaItem.id, title: mediaItem.title || '', mediaType: mediaItem.mediaType }
                  })
                )
        }
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        size={size}
        variant='icon'
      />
    </Tooltip>
  );
};

export default Bookmark;
