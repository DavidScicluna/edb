import { FC, useState, useCallback, useEffect } from 'react';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalBody,
	ConfirmModalFooter,
	Button,
	IconButton,
	IconButtonIcon,
	Icon
} from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { uniqBy } from 'lodash';
import dayjs from 'dayjs';
import { sort } from 'fast-sort';

import { CommonBookmarkModalProps as RemoveBookmarkProps } from '../../common/types';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { setUserLists } from '../../../../../../../store/slices/Users';
import { UserList, UserListMediaItems } from '../../../../../../../store/slices/Users/types';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';

const RemoveBookmark: FC<RemoveBookmarkProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const {
		data: { id, lists = [] }
	} = useSelector((state) => state.users.data.activeUser);

	const { mediaType, mediaItem, title, isOpen = false, onClose } = props;

	const [isMultiple, setIsMultiple] = useBoolean();
	const [description, setDescription] = useState<string>('');

	const handleCheckBookmark = useCallback(() => {
		if (isOpen) {
			const selectedLists = lists.filter((list) => {
				switch (mediaType) {
					case 'movie':
						return list.mediaItems.movies.some(
							(listMediaItem) => listMediaItem.mediaItem.id === mediaItem?.id
						);
					case 'tv':
						return list.mediaItems.tv.some((listMediaItem) => listMediaItem.mediaItem.id === mediaItem?.id);
					default:
						return false;
				}
			});
			const selectedListsLabel =
				selectedLists.length > 2
					? [
							selectedLists
								.filter((_list, index) => index < selectedLists.length - 1)
								.map((list) => `"${list.label}"`)
								.join(', '),
							selectedLists[selectedLists.length - 1]
					  ].join(' & ')
					: selectedLists.map((list) => `"${list.label}"`).join(' & ');

			setIsMultiple[selectedLists.length > 1 ? 'on' : 'off']();
			setDescription(
				`Are you sure you want to remove "${title}" ${formatMediaTypeLabel({
					type: 'single',
					mediaType
				})} from the ${selectedListsLabel} lists?`
			);
		}
	}, [isOpen, lists, mediaType, mediaItem, title]);

	const handleRemoveBookmark = useCallback((): void => {
		const updatedLists: UserList[] = [];

		lists.forEach((list) => {
			switch (mediaType) {
				case 'movie': {
					if (list.mediaItems.movies.some((movie) => movie.mediaItem.id === mediaItem?.id)) {
						const mediaItems: UserListMediaItems = {
							...list.mediaItems,
							movies: sort(
								uniqBy(
									[...list.mediaItems.movies.filter((movie) => movie.mediaItem.id !== mediaItem?.id)],
									'mediaItem.id'
								)
							).desc((movie) => movie.addedAt)
						};

						updatedLists.push({
							...list,
							updatedAt: dayjs(new Date()).toISOString(),
							mediaItems: { ...mediaItems }
						});
					} else {
						updatedLists.push({ ...list });
					}
					break;
				}
				case 'tv': {
					if (list.mediaItems.tv.some((show) => show.mediaItem.id === mediaItem?.id)) {
						const mediaItems: UserListMediaItems = {
							...list.mediaItems,
							tv: sort(
								uniqBy(
									[...list.mediaItems.tv.filter((show) => show.mediaItem.id !== mediaItem?.id)],
									'mediaItem.id'
								)
							).desc((show) => show.addedAt)
						};

						updatedLists.push({
							...list,
							updatedAt: dayjs(new Date()).toISOString(),
							mediaItems: { ...mediaItems }
						});
					} else {
						updatedLists.push({ ...list });
					}
					break;
				}
			}
		});

		dispatch(setUserLists({ id, data: sort([...updatedLists]).desc((list) => list.updatedAt) }));

		onClose();
	}, [id, lists, mediaType, mediaItem, onClose]);

	useEffect(() => handleCheckBookmark(), [isOpen]);

	return (
		<ConfirmModal
			colorMode={colorMode}
			renderCancel={({ icon, category, ...rest }) => (
				<IconButton {...rest}>
					<IconButtonIcon icon={icon} category={category} />
				</IconButton>
			)}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ConfirmModalStack spacing={4} p={4}>
				<ConfirmModalIcon
					renderIcon={(props) => (
						<Icon
							{...props}
							width={theme.fontSizes['6xl']}
							height={theme.fontSizes['6xl']}
							fontSize={theme.fontSizes['6xl']}
							icon='delete_forever'
							category='outlined'
						/>
					)}
					color='red'
					p={2}
				/>

				<ConfirmModalBody>
					<ConfirmModalTitle>{`Remove from ${isMultiple ? 'Lists' : 'List'}?`}</ConfirmModalTitle>
					<ConfirmModalSubtitle>{description}</ConfirmModalSubtitle>
				</ConfirmModalBody>
				<ConfirmModalFooter
					renderCancel={(props) => <Button {...props}>Cancel</Button>}
					renderAction={(props) => (
						<Button {...props} color='red' onClick={handleRemoveBookmark}>
							Remove Bookmark
						</Button>
					)}
				/>
			</ConfirmModalStack>
		</ConfirmModal>
	);
};

export default RemoveBookmark;
