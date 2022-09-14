import { FC, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useDebounce } from 'usehooks-ts';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import { defaultBookmarkModal, setBookmarkModal } from '../../../../../store/slices/Modals';

import AddBookmark from './components/AddBookmark';
import RemoveBookmark from './components/RemoveBookmark';

const BookmarkModal: FC = () => {
	const dispatch = useDispatch();
	const {
		data: { lists = [] }
	} = useSelector((state) => state.users.data.activeUser);
	const bookmarkModal = useSelector((state) => state.modals.ui.bookmarkModal);

	const { mediaType, mediaItem } = bookmarkModal;

	const [isBookmarkedMultiple, setIsBookmarkedMultiple] = useBoolean();
	const isBookmarkedMultipleDebounced = useDebounce(isBookmarkedMultiple, 500);

	const handleClose = useCallback(() => {
		dispatch(setBookmarkModal({ ...defaultBookmarkModal }));
	}, [defaultBookmarkModal]);

	const handleIsBookmarked = useCallback((): void => {
		let inLists = 0;

		lists.forEach((list) => {
			switch (mediaType) {
				case 'movie': {
					if (list.mediaItems.movies.some((movie) => movie.mediaItem.id === mediaItem?.id)) {
						inLists = inLists + 1;
					}
					return;
				}
				case 'tv': {
					if (list.mediaItems.tv.some((show) => show.mediaItem.id === mediaItem?.id)) {
						inLists = inLists + 1;
					}
					return;
				}
			}
		});

		setIsBookmarkedMultiple[inLists > 1 ? 'on' : 'off']();
	}, [lists, mediaType, mediaItem, lists]);

	useEffect(() => handleIsBookmarked(), [bookmarkModal]);

	return isBookmarkedMultipleDebounced ? (
		<RemoveBookmark {...bookmarkModal} onClose={handleClose} />
	) : (
		<AddBookmark {...bookmarkModal} onClose={handleClose} />
	);
};

export default BookmarkModal;
