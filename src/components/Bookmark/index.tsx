import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  BookmarkOutlined as BookmarkOutlinedIcon
} from '@material-ui/icons/';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../common/hooks';
import utils from '../../common/utils/utils';
import { toggleList } from '../../store/slices/Modals';
import { setLists } from '../../store/slices/User';
import { List } from '../../store/slices/User/types';
import IconButton from '../Clickable/IconButton';
import Tooltip from '../Tooltip';
import { BookmarkProps } from './types';

const Bookmark = (props: BookmarkProps): ReactElement => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.user.data.lists);
  const color = useSelector((state) => state.user.ui.theme.color);

  const { isDisabled = false, title, mediaType, mediaItem, size = 'sm' } = props;

  const [isHovering, setIsHovering] = useBoolean();

  const list = mediaItem
    ? lists.find((list) => {
        switch (mediaType) {
          case 'movie':
            return list.results.movies.some((movie) => movie.id === mediaItem.id);
          case 'tv':
            return list.results.tv.some((show) => show.id === mediaItem.id);
          default:
            return;
        }
      })
    : undefined;
  const isBookmarked: boolean = list
    ? mediaType === 'movie'
      ? list.results.movies.some((movie) => movie.id === mediaItem?.id)
      : list.results.tv.some((show) => show.id === mediaItem?.id)
    : false;

  const handleRemoveBookmark = (list: List): void => {
    const results = { ...list.results };

    switch (mediaType) {
      case 'movie':
        results.movies = results.movies.filter((movie) => movie.id !== mediaItem?.id) || [];
        break;
      case 'tv':
        results.tv = results.tv.filter((show) => show.id !== mediaItem?.id) || [];
        break;
      default:
        break;
    }

    dispatch(
      setLists(
        lists.map((paramList) =>
          paramList.id === list.id
            ? {
                ...paramList,
                results: { ...results }
              }
            : paramList
        )
      )
    );
  };

  const handleOpenListsModal = (): void => {
    if (mediaItem) {
      dispatch(
        toggleList({
          open: true,
          title,
          mediaType,
          mediaItem: {
            ...mediaItem
          }
        })
      );
    }
  };

  return (
    <Tooltip
      aria-label={
        isBookmarked
          ? `Remove "${title}" ${mediaType} from ${list?.label ? `"${list.label}"` : ''} (tooltip)`
          : `Add "${title}" ${mediaType} to a list (tooltip)`
      }
      label={
        isBookmarked
          ? `Remove "${title}" from ${list?.label ? `"${list.label}"` : ''} list`
          : `Add "${title}" to a list`
      }
      placement='top'
      isOpen={isHovering}
      isDisabled={isDisabled || !mediaItem}
      gutter={8}>
      <IconButton
        aria-label={
          isBookmarked
            ? `Remove "${title}" ${mediaType} from ${list?.label ? `"${list.label}"` : ''} (tooltip)`
            : `Add "${title}" ${mediaType} to a list (tooltip)`
        }
        color={isBookmarked ? utils.handleReturnColor(color) : 'gray'}
        isDisabled={isDisabled || !mediaItem}
        icon={isBookmarked ? BookmarkOutlinedIcon : BookmarkBorderOutlinedIcon}
        onClick={isBookmarked && list ? () => handleRemoveBookmark(list) : () => handleOpenListsModal()}
        onMouseEnter={() => setIsHovering.on()}
        onMouseLeave={() => setIsHovering.off()}
        size={size}
        variant='icon'
      />
    </Tooltip>
  );
};

export default Bookmark;
