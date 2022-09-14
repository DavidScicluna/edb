import { ReactElement, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useDebounce } from 'usehooks-ts';

import { useSelector } from '../../../common/hooks';
import { setBookmarkModal } from '../../../store/slices/Modals';
import { MediaType } from '../../../common/types';

import { BookmarkProps } from './types';

const Bookmark = <MT extends MediaType>(props: BookmarkProps<MT>): ReactElement => {
	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);

	const { lists = [] } = activeUser.data;

	const { renderAction, mediaType, mediaItem, title, isFocused = false, isHovering = false } = props;

	const [isBookmarked, setIsBookmarked] = useBoolean();
	const isBookmarkedDebounced = useDebounce(isBookmarked, 500);

	const [isBookmarkedMultiple, setIsBookmarkedMultiple] = useBoolean();
	const isBookmarkedMultipleDebounced = useDebounce(isBookmarkedMultiple, 500);

	const handleIsBookmarked = useCallback((): void => {
		let isBookmarked = false;
		let inLists = 0;

		lists.forEach((list) => {
			switch (mediaType) {
				case 'movie': {
					if (list.mediaItems.movies.some((movie) => movie.mediaItem.id === mediaItem?.id)) {
						isBookmarked = true;
						inLists = inLists + 1;
					}
					return;
				}
				case 'tv': {
					if (list.mediaItems.tv.some((show) => show.mediaItem.id === mediaItem?.id)) {
						isBookmarked = true;
						inLists = inLists + 1;
					}
					return;
				}
			}
		});

		setIsBookmarked[isBookmarked ? 'on' : 'off']();
		setIsBookmarkedMultiple[inLists > 1 ? 'on' : 'off']();
	}, [lists, mediaType, mediaItem, lists]);

	const handleBookmarkClick = useCallback((): void => {
		dispatch(
			setBookmarkModal({
				mediaType,
				mediaItem,
				title,
				isOpen: true
			})
		);
	}, [mediaType, mediaItem, title]);

	useEffect(() => handleIsBookmarked(), [lists]);

	return renderAction({
		iconType: isBookmarkedDebounced
			? isBookmarkedMultipleDebounced
				? 'bookmarks'
				: isFocused || isHovering
				? 'bookmark_remove'
				: 'bookmark_added'
			: isFocused || isHovering
			? 'bookmark_add'
			: 'bookmark_border',
		iconCategory: 'outlined',
		isDisabled: !!activeUser,
		isBookmarked: isBookmarkedDebounced,
		isBookmarkedMultiple: isBookmarkedMultipleDebounced,
		onClick: () => handleBookmarkClick()
	});
};

export default Bookmark;
