import { ReactElement } from 'react';

import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../common/hooks';
import { handleReturnColor } from '../../common/utils';
import { toggleConfirm, toggleList } from '../../store/slices/Modals';
import { setLists } from '../../store/slices/User';
import { List } from '../../store/slices/User/types';
import { BookmarkProps } from './types';

const Bookmark = (props: BookmarkProps): ReactElement => {
  const dispatch = useDispatch();
  const allLists = useSelector((state) => state.user.data.lists);
  const color = useSelector((state) => state.user.ui.theme.color);
  const confirmModal = useSelector((state) => state.modals.ui.confirmModal);

  const { renderButton, title, mediaType, mediaItem } = props;

  const lists = mediaItem
    ? allLists.filter((list) => {
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
  const isBookmarked: boolean = lists && (lists.length || 0) > 0 ? true : false;

  const handleRemoveBookmark = (lists: List[]): void => {
    dispatch(
      setLists(
        allLists.map((list) => {
          if (lists.includes(list)) {
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

            return { ...list, results: { ...results } };
          } else {
            return list;
          }
        })
      )
    );
  };

  const handleOpenConfirmModal = (): void => {
    dispatch(
      toggleConfirm({
        open: true,
        title: `Remove "${title}" ${mediaType} from lists?`,
        description: `Are you sure you want to remove "${title}" ${mediaType} from ${lists
          ?.map((list) => `"${list.label}"`)
          .filter((list) => list)
          .join(', ')} lists?`,
        stringifiedButtonProps: _.toString({
          color: handleReturnColor(color),
          label: 'Remove',
          onClick: () => {
            handleRemoveBookmark(lists || []);

            dispatch(toggleConfirm({ ...confirmModal, open: false }));
          }
        })
      })
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
    lists,
    isBookmarked,
    onClick:
      isBookmarked && lists && (lists?.length || 0) > 0
        ? lists.length > 1
          ? () => handleOpenConfirmModal()
          : () => handleRemoveBookmark(lists)
        : () => handleOpenListsModal()
  });
};

export default Bookmark;
