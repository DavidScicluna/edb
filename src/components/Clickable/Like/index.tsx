import { ReactElement, useContext, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { sort } from 'fast-sort';
import { debounce, uniqBy } from 'lodash';

import { isGuest as defaultIsGuest } from '../../../containers/Layout/common/data/defaultPropValues';
import { LayoutContext } from '../../../containers/Layout';
import { LayoutContext as LayoutContextType } from '../../../containers/Layout/types';
import { useSelector } from '../../../common/hooks';
import { setUserLiked } from '../../../store/slices/Users';
import { FullCompany, MediaType } from '../../../common/types';
import { MediaItem, MediaItems } from '../../../store/slices/Users/types';
import { Collection, FullMovie } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';
import { setAuthenticationConfirmModal } from '../../../store/slices/Modals';
import { formatMediaTypeLabel } from '../../../common/utils';

import { LikeProps } from './types';

const Like = <MT extends MediaType>(props: LikeProps<MT>): ReactElement => {
	const { isGuest = defaultIsGuest } = useContext<LayoutContextType>(LayoutContext);

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);

	const { id, liked } = activeUser.data;

	const { renderAction, mediaType, mediaItem, title } = props;

	const [isLiked, setIsLiked] = useBoolean();

	const handleIsLiked = useCallback((): void => {
		let isLiked = false;

		switch (mediaType) {
			case 'movie': {
				isLiked = liked.movies.some((movie) => movie.mediaItem.id === mediaItem.id);
				break;
			}
			case 'tv': {
				isLiked = liked.tv.some((show) => show.mediaItem.id === mediaItem.id);
				break;
			}
			case 'person': {
				isLiked = liked.people.some((person) => person.mediaItem.id === mediaItem.id);
				break;
			}
			case 'company': {
				isLiked = liked.companies.some((company) => company.mediaItem.id === mediaItem.id);
				break;
			}
			case 'collection': {
				isLiked = liked.collections.some((collection) => collection.mediaItem.id === mediaItem.id);
				break;
			}
		}

		setIsLiked[isLiked ? 'on' : 'off']();
	}, [mediaType, mediaItem, liked]);

	const handleUnlike = useCallback(
		debounce((): void => {
			const updatedLiked: MediaItems = {
				movies: [...(liked.movies || [])],
				tv: [...(liked.tv || [])],
				people: [...(liked.people || [])],
				companies: [...(liked.companies || [])],
				collections: [...(liked.collections || [])]
			};

			switch (mediaType) {
				case 'movie': {
					updatedLiked.movies = sort(
						uniqBy(
							[...updatedLiked.movies.filter((movie) => movie.mediaItem.id !== mediaItem.id)],
							'mediaItem.id'
						)
					).by({ desc: (movie) => movie.addedAt });
					break;
				}
				case 'tv': {
					updatedLiked.tv = sort(
						uniqBy(
							[...updatedLiked.tv.filter((show) => show.mediaItem.id !== mediaItem.id)],
							'mediaItem.id'
						)
					).by({
						desc: (show) => show.addedAt
					});
					break;
				}
				case 'person': {
					updatedLiked.people = sort(
						uniqBy(
							[...updatedLiked.people.filter((person) => person.mediaItem.id !== mediaItem.id)],
							'mediaItem.id'
						)
					).by({ desc: (person) => person.addedAt });
					break;
				}
				case 'company': {
					updatedLiked.companies = sort(
						uniqBy(
							[...updatedLiked.companies.filter((company) => company.mediaItem.id !== mediaItem.id)],
							'mediaItem.id'
						)
					).by({ desc: (company) => company.addedAt });
					break;
				}
				case 'collection': {
					updatedLiked.collections = sort(
						uniqBy(
							[
								...updatedLiked.collections.filter(
									(collection) => collection.mediaItem.id !== mediaItem.id
								)
							],
							'mediaItem.id'
						)
					).by({ desc: (collection) => collection.addedAt });
					break;
				}
			}

			dispatch(setUserLiked({ id, data: { ...updatedLiked } }));
		}, 1000),
		[mediaType, mediaItem, liked, id]
	);

	const handleLike = useCallback(
		debounce((): void => {
			const updatedLiked: MediaItems = {
				movies: [...(liked.movies || [])],
				tv: [...(liked.tv || [])],
				people: [...(liked.people || [])],
				companies: [...(liked.companies || [])],
				collections: [...(liked.collections || [])]
			};

			switch (mediaType) {
				case 'movie': {
					updatedLiked.movies = sort(
						uniqBy(
							[
								...updatedLiked.movies,
								{
									mediaItem: { ...(mediaItem as FullMovie) },
									mediaType: 'movie',
									addedAt: dayjs(new Date()).toISOString()
								} as MediaItem<'movie'>
							],
							'mediaItem.id'
						)
					).by({ desc: (movie) => movie.addedAt });
					break;
				}
				case 'tv': {
					updatedLiked.tv = sort(
						uniqBy(
							[
								...updatedLiked.tv,
								{
									mediaItem: { ...(mediaItem as FullTV) },
									mediaType: 'tv',
									addedAt: dayjs(new Date()).toISOString()
								} as MediaItem<'tv'>
							],
							'mediaItem.id'
						)
					).by({ desc: (show) => show.addedAt });
					break;
				}
				case 'person': {
					updatedLiked.people = sort(
						uniqBy(
							[
								...updatedLiked.people,
								{
									mediaItem: { ...(mediaItem as FullPerson) },
									mediaType: 'person',
									addedAt: dayjs(new Date()).toISOString()
								} as MediaItem<'person'>
							],
							'mediaItem.id'
						)
					).by({ desc: (person) => person.addedAt });
					break;
				}
				case 'company': {
					updatedLiked.companies = sort(
						uniqBy(
							[
								...updatedLiked.companies,
								{
									mediaItem: { ...(mediaItem as FullCompany) },
									mediaType: 'company',
									addedAt: dayjs(new Date()).toISOString()
								} as MediaItem<'company'>
							],
							'mediaItem.id'
						)
					).by({ desc: (company) => company.addedAt });
					break;
				}
				case 'collection': {
					updatedLiked.collections = sort(
						uniqBy(
							[
								...updatedLiked.collections,
								{
									mediaItem: { ...(mediaItem as Collection) },
									mediaType: 'collection',
									addedAt: dayjs(new Date()).toISOString()
								} as MediaItem<'collection'>
							],
							'mediaItem.id'
						)
					).by({ desc: (collection) => collection.addedAt });
					break;
				}
			}

			dispatch(setUserLiked({ id, data: { ...updatedLiked } }));
		}, 1000),
		[mediaType, mediaItem, liked, id]
	);

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
		}, 1000),
		[isGuest, isLiked]
	);

	useEffect(() => handleIsLiked(), [liked]);

	return renderAction({
		iconType: isLiked ? 'favorite' : 'favorite_border',
		iconCategory: 'filled',
		isDisabled: !activeUser,
		isLiked: isLiked,
		onClick: () => handleClick()
	});
};

export default Like;
