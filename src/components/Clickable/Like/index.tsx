import { ReactElement, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { sort } from 'fast-sort';
import { debounce, uniq } from 'lodash';

import { useSelector } from '../../../common/hooks';
import { setUserLiked } from '../../../store/slices/Users';
import { FullCompany, MediaType } from '../../../common/types';
import { MediaItem, MediaItems } from '../../../store/slices/Users/types';
import { Collection, FullMovie } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';
import { setAuthenticationConfirmModal } from '../../../store/slices/Modals';
import { formatMediaTypeLabel } from '../../../common/utils';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';

import { LikeProps } from './types';

const Like = <MT extends MediaType>(props: LikeProps<MT>): ReactElement => {
	const { isGuest } = useLayoutContext();

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);

	const { id, liked } = activeUser.data;

	const { renderAction, mediaType, mediaItem, title } = props;

	const [isLiked, setIsLiked] = useBoolean();

	const handleIsLiked = useCallback(
		debounce((): void => {
			let isLiked = false;

			switch (mediaType) {
				case 'movie': {
					isLiked = liked.movie.some((movie) => movie.mediaItem.id === mediaItem.id);
					break;
				}
				case 'tv': {
					isLiked = liked.tv.some((show) => show.mediaItem.id === mediaItem.id);
					break;
				}
				case 'person': {
					isLiked = liked.person.some((person) => person.mediaItem.id === mediaItem.id);
					break;
				}
				case 'company': {
					isLiked = liked.company.some((company) => company.mediaItem.id === mediaItem.id);
					break;
				}
				case 'collection': {
					isLiked = liked.collection.some((collection) => collection.mediaItem.id === mediaItem.id);
					break;
				}
			}

			setIsLiked[isLiked ? 'on' : 'off']();
		}, 100),
		[mediaType, mediaItem, liked]
	);

	const handleUnlike = (): void => {
		const updatedLiked: MediaItems = {
			movie: [...(liked.movie || [])],
			tv: [...(liked.tv || [])],
			person: [...(liked.person || [])],
			company: [...(liked.company || [])],
			collection: [...(liked.collection || [])]
		};

		switch (mediaType) {
			case 'movie': {
				updatedLiked.movie = sort(
					uniq([...updatedLiked.movie.filter((movie) => movie.mediaItem.id !== mediaItem.id)])
				).desc((movie) => movie.addedAt);
				break;
			}
			case 'tv': {
				updatedLiked.tv = sort(
					uniq([...updatedLiked.tv.filter((show) => show.mediaItem.id !== mediaItem.id)])
				).desc((show) => show.addedAt);
				break;
			}
			case 'person': {
				updatedLiked.person = sort(
					uniq([...updatedLiked.person.filter((person) => person.mediaItem.id !== mediaItem.id)])
				).desc((person) => person.addedAt);
				break;
			}
			case 'company': {
				updatedLiked.company = sort(
					uniq([...updatedLiked.company.filter((company) => company.mediaItem.id !== mediaItem.id)])
				).desc((company) => company.addedAt);
				break;
			}
			case 'collection': {
				updatedLiked.collection = sort(
					uniq([...updatedLiked.collection.filter((collection) => collection.mediaItem.id !== mediaItem.id)])
				).desc((collection) => collection.addedAt);
				break;
			}
		}

		dispatch(setUserLiked({ id, data: { ...updatedLiked } }));
	};

	const handleLike = (): void => {
		const updatedLiked: MediaItems = {
			movie: [...(liked.movie || [])],
			tv: [...(liked.tv || [])],
			person: [...(liked.person || [])],
			company: [...(liked.company || [])],
			collection: [...(liked.collection || [])]
		};

		switch (mediaType) {
			case 'movie': {
				updatedLiked.movie = sort(
					uniq([
						...updatedLiked.movie,
						{
							mediaItem: { ...(mediaItem as FullMovie) },
							mediaType: 'movie',
							addedAt: dayjs(new Date()).toISOString()
						} as MediaItem<'movie'>
					])
				).desc((movie) => movie.addedAt);
				break;
			}
			case 'tv': {
				updatedLiked.tv = sort(
					uniq([
						...updatedLiked.tv,
						{
							mediaItem: { ...(mediaItem as FullTV) },
							mediaType: 'tv',
							addedAt: dayjs(new Date()).toISOString()
						} as MediaItem<'tv'>
					])
				).desc((show) => show.addedAt);
				break;
			}
			case 'person': {
				updatedLiked.person = sort(
					uniq([
						...updatedLiked.person,
						{
							mediaItem: { ...(mediaItem as FullPerson) },
							mediaType: 'person',
							addedAt: dayjs(new Date()).toISOString()
						} as MediaItem<'person'>
					])
				).desc((person) => person.addedAt);
				break;
			}
			case 'company': {
				updatedLiked.company = sort(
					uniq([
						...updatedLiked.company,
						{
							mediaItem: { ...(mediaItem as FullCompany) },
							mediaType: 'company',
							addedAt: dayjs(new Date()).toISOString()
						} as MediaItem<'company'>
					])
				).desc((company) => company.addedAt);
				break;
			}
			case 'collection': {
				updatedLiked.collection = sort(
					uniq([
						...updatedLiked.collection,
						{
							mediaItem: { ...(mediaItem as Collection) },
							mediaType: 'collection',
							addedAt: dayjs(new Date()).toISOString()
						} as MediaItem<'collection'>
					])
				).desc((collection) => collection.addedAt);
				break;
			}
		}

		dispatch(setUserLiked({ id, data: { ...updatedLiked } }));
	};

	// TODO: Create a debounce util where we can pass them duration
	const handleClick = useCallback(
		debounce((): void => {
			if (!isGuest) {
				if (isLiked) {
					handleUnlike();
				} else {
					handleLike();
				}
			} else {
				dispatch(
					setAuthenticationConfirmModal({
						isOpen: true,
						title: 'Like Not-Allowed!',
						description: [
							`In order to be able to like the "${title}" ${formatMediaTypeLabel({
								type: 'single',
								mediaType
							})}, you'll need to sign in to an account first!`,
							'Click on the "SIGN IN" button to go to the sign-in page.'
						]
					})
				);
			}
		}, 100),
		[isGuest, isLiked, handleUnlike, handleLike, title, mediaType]
	);

	useEffect(() => handleIsLiked(), [liked]);

	return renderAction({
		iconType: isLiked ? 'favorite' : 'favorite_border',
		iconCategory: 'filled',
		isDisabled: !activeUser,
		isLiked: isLiked,
		onClick: () => handleClick(),
		sx: { 'transform': 'scale(1)', '&:active': { transform: 'scale(0.9)' } }
	});
};

export default Like;
