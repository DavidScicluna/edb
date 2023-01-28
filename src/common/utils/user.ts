import dayjs from 'dayjs';
import { sort } from 'fast-sort';
import { memoize, uniqBy } from 'lodash';

import { MediaItem, UserRecentlyViewed, UserRecentlyViewedMediaType } from '../../store/slices/Users/types';
import { Collection, FullMovie } from '../types/movie';
import { FullPerson } from '../types/person';
import { FullTV } from '../types/tv';

type GetUpdatedRecentlyViewedListProps<MT extends UserRecentlyViewedMediaType> = {
	recentlyViewed: UserRecentlyViewed;
} & Pick<MediaItem<MT>, 'mediaItem' | 'mediaType'>;

export const getUpdatedRecentlyViewedList = memoize(
	<MT extends UserRecentlyViewedMediaType>(props: GetUpdatedRecentlyViewedListProps<MT>): UserRecentlyViewed => {
		const { recentlyViewed, mediaType, mediaItem } = props;

		const updatedRecentlyViewed: UserRecentlyViewed = {
			movie: [...(recentlyViewed.movie || [])],
			tv: [...(recentlyViewed.tv || [])],
			person: [...(recentlyViewed.person || [])],
			collection: [...(recentlyViewed.collection || [])]
		};

		switch (mediaType) {
			case 'movie': {
				updatedRecentlyViewed.movie = sort(
					uniqBy(
						[
							...updatedRecentlyViewed.movie,
							{
								mediaItem: { ...(mediaItem as FullMovie) },
								mediaType: 'movie',
								addedAt: dayjs(new Date()).toISOString()
							} as MediaItem<'movie'>
						],
						'mediaItem.id'
					)
				).desc(({ addedAt }) => addedAt);
				break;
			}
			case 'tv': {
				updatedRecentlyViewed.tv = sort(
					uniqBy(
						[
							...updatedRecentlyViewed.tv,
							{
								mediaItem: { ...(mediaItem as FullTV) },
								mediaType: 'tv',
								addedAt: dayjs(new Date()).toISOString()
							} as MediaItem<'tv'>
						],
						'mediaItem.id'
					)
				).desc(({ addedAt }) => addedAt);
				break;
			}
			case 'person': {
				updatedRecentlyViewed.person = sort(
					uniqBy(
						[
							...updatedRecentlyViewed.person,
							{
								mediaItem: { ...(mediaItem as FullPerson) },
								mediaType: 'person',
								addedAt: dayjs(new Date()).toISOString()
							} as MediaItem<'person'>
						],
						'mediaItem.id'
					)
				).desc(({ addedAt }) => addedAt);
				break;
			}
			case 'collection': {
				updatedRecentlyViewed.collection = sort(
					uniqBy(
						[
							...updatedRecentlyViewed.collection,
							{
								mediaItem: { ...(mediaItem as Collection) },
								mediaType: 'collection',
								addedAt: dayjs(new Date()).toISOString()
							} as MediaItem<'collection'>
						],
						'mediaItem.id'
					)
				).desc(({ addedAt }) => addedAt);
				break;
			}
		}

		return { ...updatedRecentlyViewed };
	}
);
