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
				const newRecentlyViewedMovie: MediaItem<'movie'> = {
					mediaItem: { ...(mediaItem as FullMovie) },
					mediaType: 'movie',
					addedAt: dayjs(new Date()).toISOString()
				};
				const filteredRecentlyViewedMovies: MediaItem<'movie'>[] = updatedRecentlyViewed.movie.filter(
					({ mediaItem: movie }) => movie.id !== mediaItem.id
				);

				const updatedRecentlyViewedMovies: MediaItem<'movie'>[] = [
					...filteredRecentlyViewedMovies,
					newRecentlyViewedMovie
				];

				updatedRecentlyViewed.movie = sort(uniqBy([...updatedRecentlyViewedMovies], 'mediaItem.id')).desc(
					({ addedAt }) => addedAt
				);
				break;
			}
			case 'tv': {
				const newRecentlyViewedTVShow: MediaItem<'tv'> = {
					mediaItem: { ...(mediaItem as FullTV) },
					mediaType: 'tv',
					addedAt: dayjs(new Date()).toISOString()
				};
				const filteredRecentlyViewedTVShows: MediaItem<'tv'>[] = updatedRecentlyViewed.tv.filter(
					({ mediaItem: show }) => show.id !== mediaItem.id
				);

				const updatedRecentlyViewedTVShows: MediaItem<'tv'>[] = [
					...filteredRecentlyViewedTVShows,
					newRecentlyViewedTVShow
				];

				updatedRecentlyViewed.tv = sort(uniqBy([...updatedRecentlyViewedTVShows], 'mediaItem.id')).desc(
					({ addedAt }) => addedAt
				);
				break;
			}
			case 'person': {
				const newRecentlyViewedPerson: MediaItem<'person'> = {
					mediaItem: { ...(mediaItem as FullPerson) },
					mediaType: 'person',
					addedAt: dayjs(new Date()).toISOString()
				};
				const filteredRecentlyViewedPeople: MediaItem<'person'>[] = updatedRecentlyViewed.person.filter(
					({ mediaItem: show }) => show.id !== mediaItem.id
				);

				const updatedRecentlyViewedPeople: MediaItem<'person'>[] = [
					...filteredRecentlyViewedPeople,
					newRecentlyViewedPerson
				];

				updatedRecentlyViewed.person = sort(uniqBy([...updatedRecentlyViewedPeople], 'mediaItem.id')).desc(
					({ addedAt }) => addedAt
				);
				break;
			}
			case 'collection': {
				const newRecentlyViewedCollection: MediaItem<'collection'> = {
					mediaItem: { ...(mediaItem as Collection) },
					mediaType: 'collection',
					addedAt: dayjs(new Date()).toISOString()
				};
				const filteredRecentlyViewedCollections: MediaItem<'collection'>[] =
					updatedRecentlyViewed.collection.filter(({ mediaItem: show }) => show.id !== mediaItem.id);

				const updatedRecentlyViewedCollections: MediaItem<'collection'>[] = [
					...filteredRecentlyViewedCollections,
					newRecentlyViewedCollection
				];

				updatedRecentlyViewed.collection = sort(
					uniqBy([...updatedRecentlyViewedCollections], 'mediaItem.id')
				).desc(({ addedAt }) => addedAt);
				break;
			}
		}

		return { ...updatedRecentlyViewed };
	}
);
