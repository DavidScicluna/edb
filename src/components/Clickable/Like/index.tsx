import { ReactElement, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useDebounce } from 'usehooks-ts';

import { useSelector } from '../../../common/hooks';
import { setUserLiked } from '../../../store/slices/Users';
import { FullCompany, MediaType } from '../../../common/types';
import { MediaItems } from '../../../store/slices/Users/types';
import { Collection, FullMovie } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';

import { LikeProps } from './types';

const Like = <MT extends MediaType>(props: LikeProps<MT>): ReactElement => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.users.data.activeUser);

	const { id, liked } = user.data;

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

	const handleRemoveLike = useCallback((): void => {
		const updatedLiked: MediaItems = {
			movies: [...(liked.movies || [])],
			tv: [...(liked.tv || [])],
			people: [...(liked.people || [])],
			companies: [...(liked.companies || [])],
			collections: [...(liked.collections || [])]
		};

		switch (mediaType) {
			case 'movie': {
				updatedLiked.movies = updatedLiked.movies.filter((movie) => movie.mediaItem.id !== mediaItem.id);
				break;
			}
			case 'tv': {
				updatedLiked.tv = updatedLiked.tv.filter((show) => show.mediaItem.id !== mediaItem.id);
				break;
			}
			case 'person': {
				updatedLiked.people = updatedLiked.people.filter((person) => person.mediaItem.id !== mediaItem.id);
				break;
			}
			case 'company': {
				updatedLiked.companies = updatedLiked.companies.filter(
					(company) => company.mediaItem.id !== mediaItem.id
				);
				break;
			}
			case 'collection': {
				updatedLiked.collections = updatedLiked.collections.filter(
					(collection) => collection.mediaItem.id !== mediaItem.id
				);
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
				updatedLiked.movies = [
					...updatedLiked.movies,
					{
						mediaItem: { ...(mediaItem as FullMovie) },
						mediaType: 'movie',
						dateAdded: dayjs(new Date()).toISOString()
					}
				];
				break;
			}
			case 'tv': {
				updatedLiked.tv = [
					...updatedLiked.tv,
					{
						mediaItem: { ...(mediaItem as FullTV) },
						mediaType: 'tv',
						dateAdded: dayjs(new Date()).toISOString()
					}
				];
				break;
			}
			case 'person': {
				updatedLiked.people = [
					...updatedLiked.people,
					{
						mediaItem: { ...(mediaItem as FullPerson) },
						mediaType: 'person',
						dateAdded: dayjs(new Date()).toISOString()
					}
				];
				break;
			}
			case 'company': {
				updatedLiked.companies = [
					...updatedLiked.companies,
					{
						mediaItem: { ...(mediaItem as FullCompany) },
						mediaType: 'company',
						dateAdded: dayjs(new Date()).toISOString()
					}
				];
				break;
			}
			case 'collection': {
				updatedLiked.collections = [
					...updatedLiked.collections,
					{
						mediaItem: { ...(mediaItem as Collection) },
						mediaType: 'collection',
						dateAdded: dayjs(new Date()).toISOString()
					}
				];
				break;
			}
			default:
				break;
		}

		dispatch(setUserLiked({ id, data: { ...updatedLiked } }));
	}, [mediaType, mediaItem, liked, id]);

	useEffect(() => handleIsLiked(), [liked]);

	return renderAction({
		iconType: isLikedDebounced ? 'favorite' : 'favorite_border',
		iconCategory: 'outlined',
		isDisabled: !!user,
		isLiked: isLikedDebounced,
		onClick: isLikedDebounced ? () => handleRemoveLike() : () => handleLike()
	});
};

export default Like;
