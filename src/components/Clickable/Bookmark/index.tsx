import { ReactElement } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../common/hooks';
import { toggleList } from '../../../store/slices/Modals';
import { setLists } from '../../../store/slices/User';
import { List } from '../../../store/slices/User/types';
import ConfirmModal from '../../ConfirmModal';
import Button from '../Button';
import { BookmarkProps } from './types';

const Bookmark = (props: BookmarkProps): ReactElement => {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const dispatch = useDispatch();
  const allLists = useSelector((state) => state.user.data.lists);

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

  const handleCloseConfirm = (): void => {
    handleRemoveBookmark(lists || []);
    onCloseConfirm();
  };

  return (
    <>
      {renderButton({
        lists,
        isBookmarked,
        onClick:
          isBookmarked && lists && (lists?.length || 0) > 0
            ? lists.length > 1
              ? () => onOpenConfirm()
              : () => handleRemoveBookmark(lists)
            : () => handleOpenListsModal()
      })}

      <ConfirmModal
        renderButton={
          <Button color='red' onClick={() => handleCloseConfirm()} size='sm'>
            Remove
          </Button>
        }
        title={`Remove "${title}" ${mediaType} from lists?`}
        description={`Are you sure you want to remove "${title}" ${mediaType} from ${lists
          ?.map((list) => `"${list.label}"`)
          .filter((list) => list)
          .join(', ')} lists?`}
        isOpen={isConfirmOpen}
        onClose={onCloseConfirm}
      />
    </>
  );
};

export default Bookmark;
