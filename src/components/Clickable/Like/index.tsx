import { ReactElement } from 'react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import { useSelector } from '../../../common/hooks';
import Icon from '../../../components/Icon';
import { defaultUser, getUser, setUserLiked } from '../../../store/slices/Users';

import { LikeProps } from './types';

export const handleReturnIcon = (isLiked: boolean, fontSize?: string): ReactElement => {
	return <Icon icon={isLiked ? 'favorite' : 'favorite_border'} type='outlined' fontSize={fontSize} />;
};

const Like = (props: LikeProps): ReactElement => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const liked = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.data.liked || defaultUser.data.liked
	);

	const { renderAction, mediaType, mediaItem } = props;

	const isLiked: boolean =
		liked && mediaItem
			? mediaType === 'movie'
				? liked.movies.some((movie) => movie.id === mediaItem.id)
				: mediaType === 'tv'
				? liked.tv.some((show) => show.id === mediaItem.id)
				: mediaType === 'person'
				? liked.people.some((person) => person.id === mediaItem.id)
				: mediaType === 'company'
				? liked.companies.some((company) => company.id === mediaItem.id)
				: liked.collections.some((collection) => collection.id === mediaItem.id)
			: false;

	/**
	 * This method will remove the media-item from its respective media type array
	 * Meaning the user has un-liked the media-item
	 */
	const handleRemoveLike = (): void => {
		const updatedLiked = {
			movies: liked?.movies || [],
			tv: liked?.tv || [],
			people: liked?.people || [],
			companies: liked?.companies || [],
			collections: liked?.collections || []
		};

		switch (mediaType) {
			case 'movie':
				updatedLiked.movies = (updatedLiked.movies || []).filter((movie) => movie.id !== mediaItem?.id);
				break;
			case 'tv':
				updatedLiked.tv = (updatedLiked.tv || []).filter((show) => show.id !== mediaItem?.id);
				break;
			case 'person':
				updatedLiked.people = (updatedLiked.people || []).filter((person) => person.id !== mediaItem?.id);
				break;
			case 'company':
				updatedLiked.companies = (updatedLiked.companies || []).filter(
					(company) => company.id !== mediaItem?.id
				);
				break;
			case 'collection':
				updatedLiked.collections = (updatedLiked.collections || []).filter(
					(collection) => collection.id !== mediaItem?.id
				);
				break;
			default:
				break;
		}

		dispatch(setUserLiked({ id: user || '', data: { ...updatedLiked } }));
	};

	/**
	 * This method will save the media-item into its respective media type array
	 * Meaning the user has liked the media-item
	 */
	const handleLike = (): void => {
		const updatedLiked = {
			movies: liked?.movies || [],
			tv: liked?.tv || [],
			people: liked?.people || [],
			companies: liked?.companies || [],
			collections: liked?.collections || []
		};

		switch (mediaType) {
			case 'movie': {
				const movieMediaItem = { ...mediaItem, dateAdded: dayjs(new Date()).toISOString() };

				updatedLiked.movies = [...updatedLiked.movies, movieMediaItem];
				break;
			}
			case 'tv': {
				const showMediaItem = { ...mediaItem, dateAdded: dayjs(new Date()).toISOString() };

				updatedLiked.tv = [...updatedLiked.tv, showMediaItem];
				break;
			}
			case 'person': {
				const personMediaItem = { ...mediaItem, dateAdded: dayjs(new Date()).toISOString() };

				updatedLiked.people = [...updatedLiked.people, personMediaItem];
				break;
			}
			case 'company': {
				const companyMediaItem = { ...mediaItem, dateAdded: dayjs(new Date()).toISOString() };

				updatedLiked.companies = [...updatedLiked.companies, companyMediaItem];
				break;
			}
			case 'collection': {
				const collectionMediaItem = { ...mediaItem, dateAdded: dayjs(new Date()).toISOString() };

				updatedLiked.collections = [...updatedLiked.collections, collectionMediaItem];
				break;
			}
			default:
				break;
		}

		dispatch(setUserLiked({ id: user || '', data: { ...updatedLiked } }));
	};

	return renderAction({
		isDisabled: isNil(user) || isEmpty(user),
		isLiked,
		onClick: isLiked ? () => handleRemoveLike() : () => handleLike()
	});
};

export default Like;
