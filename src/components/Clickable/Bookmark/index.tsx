import { ReactElement, useContext, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { useSelector } from '../../../common/hooks';
import { setAuthenticationConfirmModal, setBookmarkModal } from '../../../store/slices/Modals';
import { MediaType } from '../../../common/types';
import { isGuest as defaultIsGuest } from '../../../containers/Layout/common/data/defaultPropValues';
import { LayoutContext } from '../../../containers/Layout';
import { LayoutContext as LayoutContextType } from '../../../containers/Layout/types';
import { formatMediaTypeLabel } from '../../../common/utils';

import { BookmarkProps } from './types';

const Bookmark = <MT extends MediaType>(props: BookmarkProps<MT>): ReactElement => {
	const { isGuest = defaultIsGuest } = useContext<LayoutContextType>(LayoutContext);

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);

	const { lists = [] } = activeUser.data;

	const { renderAction, mediaType, mediaItem, title, isFocused = false, isHovering = false } = props;

	const [isBookmarked, setIsBookmarked] = useBoolean();

	const [isBookmarkedMultiple, setIsBookmarkedMultiple] = useBoolean();

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

	const handleClick = useCallback(
		debounce((): void => {
			if (!isGuest) {
				dispatch(
					setBookmarkModal({
						mediaType,
						mediaItem,
						title,
						isOpen: true
					})
				);
			} else {
				dispatch(
					setAuthenticationConfirmModal({
						isOpen: true,
						title: 'Bookmark Not-Allowed!',
						description: [
							`In order to be able to bookmark the "${title}" ${formatMediaTypeLabel({
								type: 'single',
								mediaType
							})} to a list, you'll need to sign in to an account first!`,
							'Click on the "SIGN IN" button to go to the sign-in page.'
						]
					})
				);
			}
		}, 1000),
		[isGuest, mediaType, mediaItem, title]
	);

	useEffect(() => handleIsBookmarked(), [lists]);

	return renderAction({
		iconType: isBookmarked
			? isBookmarkedMultiple
				? 'bookmarks'
				: isFocused || isHovering
				? 'bookmark_remove'
				: 'bookmark_added'
			: isFocused || isHovering
			? 'bookmark_add'
			: 'bookmark_border',
		iconCategory: isBookmarked ? 'filled' : 'outlined',
		isDisabled: !activeUser,
		isBookmarked: isBookmarked,
		isBookmarkedMultiple: isBookmarkedMultiple,
		onClick: () => handleClick()
	});
};

export default Bookmark;
