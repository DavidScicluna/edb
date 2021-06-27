import React, { ReactElement, useState } from 'react';

import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import { useDispatch } from 'react-redux';

import useSelector from '../../common/hooks/useSelectorTyped';
import { setLists, toggleList } from '../../store/slices/User';
import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';
import { BookmarkProps } from './types';

const Bookmark = ({ isDisabled = false, mediaItem, size = 'xs' }: BookmarkProps): ReactElement => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.user.data.lists);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const list = lists.find((list) => list.results.some((result) => result.id === mediaItem.id));
  const isBookmarked: boolean = list ? list.results.some((result) => result.id === mediaItem.id) : false;
  const titleText: string = mediaItem.title ? (mediaItem.title.length < 25 ? mediaItem.title : '') : '';

  return (
    <Tooltip
      aria-label={
        isBookmarked
          ? `Remove "${titleText}" ${mediaItem.mediaType} from ${list?.label ? `"${list.label}"` : ''} tooltip`
          : `Add "${titleText}" ${mediaItem.mediaType} to a list tooltip`
      }
      label={
        isBookmarked
          ? `Remove "${titleText}" ${mediaItem.mediaType} from ${list?.label ? `"${list.label}"` : ''} list?`
          : `Add "${titleText}" ${mediaItem.mediaType} to a list?`
      }
      placement='top'
      isOpen={isHovering}
      isDisabled={isDisabled}
      gutter={0}>
      <IconButton
        aria-label={
          isBookmarked
            ? `Remove "${titleText}" ${mediaItem.mediaType} from ${list?.label ? `"${list.label}"` : ''} tooltip`
            : `Add "${titleText}" ${mediaItem.mediaType} to a list tooltip`
        }
        color={isBookmarked ? 'blue' : 'gray'}
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
