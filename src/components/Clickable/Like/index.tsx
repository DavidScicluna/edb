import { ReactElement, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useDebounce } from 'usehooks-ts';
import { sort } from 'fast-sort';

import { useSelector } from '../../../common/hooks';
import { setUserLiked } from '../../../store/slices/Users';
import { FullCompany, MediaType } from '../../../common/types';
import { MediaItem, MediaItems } from '../../../store/slices/Users/types';
import { Collection, FullMovie } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';

import { LikeProps } from './types';

const Like = <MT extends MediaType>(props: LikeProps<MT>): ReactElement => {
	const dispatch = useDispatch();

	const activeUser = useSelector((state) => state.users.data.activeUser);

	const { id, liked } = activeUser.data;

	const { renderAction, mediaType, mediaItem } = props;

	const [isLiked, setIsLiked] = useBoolean();
	const isLikedDebounced = useDebounce(isLiked, 500);

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

	const handleUnlike = useCallback((): void => {
		const updatedLiked: MediaItems = {
			movies: [...(liked.movies || [])],
			tv: [...(liked.tv || [])],
			people: [...(liked.people || [])],
			companies: [...(liked.companies || [])],
			collections: [...(liked.collections || [])]
		};

		switch (mediaType) {
			case 'movie': {
				updatedLiked.movies = sort([
					...updatedLiked.movies.filter((movie) => movie.mediaItem.id !== mediaItem.id)
				]).by({ desc: (movie) => movie.addedAt });
				break;
			}
			case 'tv': {
				updatedLiked.tv = sort([...updatedLiked.tv.filter((show) => show.mediaItem.id !== mediaItem.id)]).by({
					desc: (show) => show.addedAt
				});
				break;
			}
			case 'person': {
				updatedLiked.people = sort([
					...updatedLiked.people.filter((person) => person.mediaItem.id !== mediaItem.id)
				]).by({ desc: (person) => person.addedAt });
				break;
			}
			case 'company': {
				updatedLiked.companies = sort([
					...updatedLiked.companies.filter((company) => company.mediaItem.id !== mediaItem.id)
				]).by({ desc: (company) => company.addedAt });
				break;
			}
			case 'collection': {
				updatedLiked.collections = sort([
					...updatedLiked.collections.filter((collection) => collection.mediaItem.id !== mediaItem.id)
				]).by({ desc: (collection) => collection.addedAt });
				break;
			}
		}

		dispatch(setUserLiked({ id, data: { ...updatedLiked } }));
	}, [mediaType, mediaItem, liked, id]);

	const handleLike = useCallback((): void => {
		const updatedLiked: MediaItems = {
			movies: [...(liked.movies || [])],
			tv: [...(liked.tv || [])],
			people: [...(liked.people || [])],
			companies: [...(liked.companies || [])],
			collections: [...(liked.collections || [])]
		};

		switch (mediaType) {
			case 'movie': {
				updatedLiked.movies = sort([
					...updatedLiked.movies,
					{
						mediaItem: { ...(mediaItem as FullMovie) },
						mediaType: 'movie',
						addedAt: dayjs(new Date()).toISOString()
					} as MediaItem<'movie'>
				]).by({ desc: (movie) => movie.addedAt });
				break;
			}
			case 'tv': {
				updatedLiked.tv = sort([
					...updatedLiked.tv,
					{
						mediaItem: { ...(mediaItem as FullTV) },
						mediaType: 'tv',
						addedAt: dayjs(new Date()).toISOString()
					} as MediaItem<'tv'>
				]).by({ desc: (show) => show.addedAt });
				break;
			}
			case 'person': {
				updatedLiked.people = sort([
					...updatedLiked.people,
					{
						mediaItem: { ...(mediaItem as FullPerson) },
						mediaType: 'person',
						addedAt: dayjs(new Date()).toISOString()
					} as MediaItem<'person'>
				]).by({ desc: (person) => person.addedAt });
				break;
			}
			case 'company': {
				updatedLiked.companies = sort([
					...updatedLiked.companies,
					{
						mediaItem: { ...(mediaItem as FullCompany) },
						mediaType: 'company',
						addedAt: dayjs(new Date()).toISOString()
					} as MediaItem<'company'>
				]).by({ desc: (company) => company.addedAt });
				break;
			}
			case 'collection': {
				updatedLiked.collections = sort([
					...updatedLiked.collections,
					{
						mediaItem: { ...(mediaItem as Collection) },
						mediaType: 'collection',
						addedAt: dayjs(new Date()).toISOString()
					} as MediaItem<'collection'>
				]).by({ desc: (collection) => collection.addedAt });
				break;
			}
		}

		dispatch(setUserLiked({ id, data: { ...updatedLiked } }));
	}, [mediaType, mediaItem, liked, id]);

	useEffect(() => handleIsLiked(), [liked]);

	return renderAction({
		iconType: isLikedDebounced ? 'favorite' : 'favorite_border',
		iconCategory: 'outlined',
		isDisabled: !!activeUser,
		isLiked: isLikedDebounced,
		onClick: isLikedDebounced ? () => handleUnlike() : () => handleLike()
	});
};

export default Like;
