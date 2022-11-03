import { FC, useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';

import { useSelector } from '../../../../../common/hooks';
import { defaultBookmarkModal, setBookmarkModal } from '../../../../../store/slices/Modals';

import AddBookmark from './components/AddBookmark';
import RemoveBookmark from './components/RemoveBookmark';
import { BookmarkModalType } from './types';

const BookmarkModal: FC = () => {
	const dispatch = useDispatch();
	const {
		data: { lists = [] }
	} = useSelector((state) => state.users.data.activeUser);
	const bookmarkModal = useSelector((state) => state.modals.ui.bookmarkModal);

	const { mediaType, mediaItem } = bookmarkModal;

	const [type, setType] = useState<BookmarkModalType>(undefined);

	const handleClose = useCallback(() => {
		dispatch(setBookmarkModal({ ...defaultBookmarkModal }));
	}, [defaultBookmarkModal]);

	const handleIsBookmarked = useCallback((): void => {
		if (bookmarkModal.isOpen) {
			let inLists = 0;

			lists.forEach((list) => {
				switch (mediaType) {
					case 'movie': {
						if (list.mediaItems.movie.some((movie) => movie.mediaItem.id === mediaItem?.id)) {
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

			setType(inLists >= 1 ? 'remove' : 'add');
		} else {
			setType(undefined);
		}
	}, [bookmarkModal, lists, mediaType, mediaItem, lists]);

	useUpdateEffect(() => handleIsBookmarked(), [bookmarkModal.isOpen]);

	switch (type) {
		case 'add':
			return <AddBookmark {...bookmarkModal} onClose={handleClose} />;
		case 'remove':
			return <RemoveBookmark {...bookmarkModal} onClose={handleClose} />;
		default:
			return null;
	}
};

export default BookmarkModal;
