import { FC, useState, useCallback, useEffect } from 'react';

import {
	useTheme,
	Modal,
	ModalStack,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	IconButton,
	IconButtonIcon
} from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, VStack, Text } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { includes, uniqBy } from 'lodash';
import { sort } from 'fast-sort';

import { CommonBookmarkModalProps as AddBookmarkProps } from '../../common/types';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import CreateList from '../../../../../../../pages/User/pages/Lists/components/CreateList';
import { setUserLists } from '../../../../../../../store/slices/Users';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { FullMovie } from '../../../../../../../common/types/movie';
import { FullTV } from '../../../../../../../common/types/tv';
import { UserList as UserList, UserListMediaItems, MediaItem } from '../../../../../../../store/slices/Users/types';

import { BookmarkListSelected } from './types';
import List from './components/List';
import { OnListClickProps } from './components/List/types';

const AddBookmark: FC<AddBookmarkProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();

	const dispatch = useDispatch();
	const {
		data: { id, lists = [] }
	} = useSelector((state) => state.users.data.activeUser);

	const { mediaType, mediaItem, title, isOpen = false, onClose } = props;

	const [selected, setSelected] = useState<BookmarkListSelected>([]);

	const handleOnListClick = useCallback(
		({ id, isSelected }: OnListClickProps): void => {
			if (isSelected) {
				setSelected(selected.filter((list) => list !== id));
			} else {
				setSelected([...selected, id]);
			}
		},
		[selected]
	);

	const handleSaveItem = useCallback((): void => {
		const updatedLists: UserList[] = lists.map((list) => {
			if (includes([...selected], list.id)) {
				const mediaItems: UserListMediaItems = { ...list.mediaItems };

				switch (mediaType) {
					case 'movie': {
						mediaItems.movies = sort(
							uniqBy(
								[
									...mediaItems.movies,
									{
										mediaItem: { ...(mediaItem as FullMovie) },
										mediaType: 'movie',
										addedAt: dayjs(new Date()).toISOString()
									} as MediaItem<'movie'>
								],
								'mediaItem.id'
							)
						).desc((movie) => movie.addedAt);
						break;
					}
					case 'tv': {
						mediaItems.tv = sort(
							uniqBy(
								[
									...mediaItems.tv,
									{
										mediaItem: { ...(mediaItem as FullTV) },
										mediaType: 'tv',
										addedAt: dayjs(new Date()).toISOString()
									} as MediaItem<'tv'>
								],
								'mediaItem.id'
							)
						).desc((show) => show.addedAt);
						break;
					}
				}

				return {
					...list,
					updatedAt: dayjs(new Date()).toISOString(),
					mediaItems: { ...mediaItems }
				};
			} else {
				return { ...list };
			}
		});

		dispatch(setUserLists({ id, data: sort([...updatedLists]).desc((list) => list.updatedAt) }));

		onClose();
	}, [id, lists, selected, mediaType, mediaItem, onClose]);

	const handleResetModal = useCallback((): void => {
		setSelected([]);
	}, []);

	useEffect(() => handleResetModal(), [isOpen]);

	return (
		<>
			<Modal colorMode={colorMode} isOpen={isOpen} onClose={onClose} size='2xl'>
				<ModalStack>
					<ModalHeader
						renderTitle={(props) => (
							<Text {...props}>{isSm || !!title ? 'Add to a list/s' : `Add "${title}" to a list/s`}</Text>
						)}
						renderSubtitle={(props) => (
							<Text {...props}>{`Create a new list or add the ${formatMediaTypeLabel({
								type: 'single',
								mediaType
							})} to an existing list by selecting a list below!`}</Text>
						)}
						renderCancel={({ icon, category, ...rest }) => (
							<IconButton {...rest}>
								<IconButtonIcon icon={icon} category={category} />
							</IconButton>
						)}
					/>
					<ModalBody>
						<VStack spacing={2}>
							{lists.map((list) => (
								<List
									key={list.id}
									list={list}
									isSelected={includes([...selected], list.id)}
									onClick={handleOnListClick}
								/>
							))}
						</VStack>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button
								{...props}
								color={color}
								isDisabled={!id}
								onClick={selected.length > 0 ? () => handleSaveItem() : () => onCreateListOpen()}
							>
								{selected.length > 0
									? `Save ${formatMediaTypeLabel({ type: 'single', mediaType })} to List${
											selected.length === 1 ? '' : 's'
									  }`
									: 'Create a new List'}
							</Button>
						)}
					/>
				</ModalStack>
			</Modal>

			<CreateList
				isOpen={isCreateListOpen}
				onClose={() => onCreateListClose()}
				onSubmit={({ id }) => handleOnListClick({ id, isSelected: false })}
			/>
		</>
	);
};

export default AddBookmark;
