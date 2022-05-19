import { ReactElement } from 'react';


import { useDisclosure } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import { useSelector } from '../../../common/hooks';
import { setList } from '../../../store/slices/Modals';
import { getUser, setUserLists } from '../../../store/slices/Users';
import { List } from '../../../store/slices/Users/types';
import ConfirmModal from '../../ConfirmModal';
import Button from '../Button';

import { BookmarkProps } from './types';

const Bookmark = (props: BookmarkProps): ReactElement => {
	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const allLists = useSelector((state) => getUser(state.users.data.users, state.app.data.user)?.data.lists || []);

	const { renderAction, title, mediaType, mediaItem } = props;

	const lists: List[] = mediaItem
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
		: [];
	const isBookmarked: boolean = lists && (lists.length || 0) > 0 ? true : false;

	const handleRemoveBookmark = (lists: List[]): void => {
		dispatch(
			setUserLists({
				id: user || '',
				data: allLists.map((list) => {
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
			})
		);
	};

	const handleOpenListsModal = (): void => {
		if (mediaItem) {
			dispatch(
				setList({
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
			{renderAction({
				lists,
				isDisabled: isNil(user) || isEmpty(user),
				isBookmarked,
				onClick:
					isBookmarked && lists && (lists?.length || 0) > 0
						? lists.length > 1
							? () => onOpenConfirm()
							: () => handleRemoveBookmark(lists)
						: () => handleOpenListsModal()
			})}

			<ConfirmModal
				renderActions={({ colorMode, size }) => (
					<Button color='red' colorMode={colorMode} onClick={() => handleCloseConfirm()} size={size}>
						Remove
					</Button>
				)}
				title='Remove from lists?'
				description={`Are you sure you want to remove "${title}" ${mediaType} from ${compact(
					lists.map((list) => `"${list.label}"`)
				).join(', ')} lists?`}
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			/>
		</>
	);
};

export default Bookmark;
