import { ReactElement } from 'react';

import { useDispatch } from 'react-redux';

import { useSelector } from '../../common/hooks';
import { toggleList } from '../../store/slices/Modals';
import { setLists } from '../../store/slices/User';
import { List } from '../../store/slices/User/types';
import { BookmarkProps } from './types';

const Bookmark = (props: BookmarkProps): ReactElement => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.user.data.lists);

  const { renderButton, title, mediaType, mediaItem } = props;

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

  return renderButton({
    list,
    isBookmarked,
    onClick: isBookmarked && list ? () => handleRemoveBookmark(list) : () => handleOpenListsModal()
  });
};

export default Bookmark;
