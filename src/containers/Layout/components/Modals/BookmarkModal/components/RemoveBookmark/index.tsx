import { FC, useCallback } from 'react';

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

import { useDispatch } from 'react-redux';
import { compact } from 'lodash';
import dayjs from 'dayjs';
import { sort } from 'fast-sort';

import { CommonBookmarkModalProps as RemoveBookmarkProps } from '../../common/types';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { setUserLists } from '../../../../../../../store/slices/Users';
import { UserList, UserListMediaItems } from '../../../../../../../store/slices/Users/types';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';

const RemoveBookmark: FC<RemoveBookmarkProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const {
		data: { id, lists = [] }
	} = useSelector((state) => state.users.data.activeUser);

	const { mediaType, mediaItem, title, isOpen = false, onClose } = props;

	const handleRemoveBookmark = useCallback((): void => {
		const updatedLists: UserList[] = [];

		lists.forEach((list) => {
			switch (mediaType) {
				case 'movie': {
					if (list.mediaItems.movies.some((movie) => movie.mediaItem.id === mediaItem?.id)) {
						const mediaItems: UserListMediaItems = {
							...list.mediaItems,
							movies: sort([
								...list.mediaItems.movies.filter((movie) => movie.mediaItem.id !== mediaItem?.id)
							]).by({ desc: (movie) => movie.addedAt })
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
							tv: sort([...list.mediaItems.tv.filter((show) => show.mediaItem.id !== mediaItem?.id)]).by({
								desc: (show) => show.addedAt
							})
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

		dispatch(setUserLists({ id, data: sort([...updatedLists]).by({ desc: (list) => list.updatedAt }) }));
	}, [id, lists, mediaType, mediaItem]);

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
							width={theme.fontSizes['4xl']}
							height={theme.fontSizes['4xl']}
							fontSize={theme.fontSizes['4xl']}
							icon='highlight_off'
							category='outlined'
						/>
					)}
					color={color}
					p={3}
				/>

				<ConfirmModalBody>
					<ConfirmModalTitle>Remove from lists?</ConfirmModalTitle>
					<ConfirmModalSubtitle>
						{`Are you sure you want to remove "${title}" ${formatMediaTypeLabel({
							type: 'single',
							mediaType
						})} from ${compact(lists.map((list) => `"${list.label}"`)).join(', ')} lists?`}
					</ConfirmModalSubtitle>
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
