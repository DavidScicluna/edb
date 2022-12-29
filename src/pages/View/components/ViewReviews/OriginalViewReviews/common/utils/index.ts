import { Nullable } from '@davidscicluna/component-library';

import dayjs from 'dayjs';
import { sort } from 'fast-sort';
import { memoize } from 'lodash';
import { v4 as uuid } from 'uuid';

import {
	UserReview,
	UserReviews,
	UserReviewsMediaItem,
	UserReviewsMediaItems
} from '../../../../../../../store/slices/Users/types';
import { ViewReviewsMediaType, ViewReviewsProps } from '../../types';

type CreateNewUserReviewsMediaItemProps<MT extends ViewReviewsMediaType> = {
	rating: Nullable<number>;
	content: string;
} & Pick<ViewReviewsProps<MT>, 'mediaType' | 'mediaItem'>;

export const createNewUserReviewsMediaItem = memoize(
	<MT extends ViewReviewsMediaType>(props: CreateNewUserReviewsMediaItemProps<MT>): UserReviewsMediaItem<MT> => {
		const { mediaType, mediaItem, rating, content } = props;

		const newUserReview: UserReview = {
			id: uuid(),
			rating: rating ? rating + 1 : undefined,
			content,
			updatedAt: '',
			createdAt: dayjs(new Date()).toISOString()
		};
		const newUserReviewsMediaItem: UserReviewsMediaItem<MT> = {
			mediaType,
			mediaItem,
			reviews: [newUserReview]
		};

		return { ...newUserReviewsMediaItem };
	}
);

type UpdateUserReviewsMediaItemProps<MT extends ViewReviewsMediaType> = {
	reviews: UserReviews;
	review?: UserReview;
	rating: Nullable<number>;
	content: string;
} & Pick<ViewReviewsProps<MT>, 'mediaType' | 'mediaItem'>;

export const updateUserReviewsMediaItem = memoize(
	<MT extends ViewReviewsMediaType>(props: UpdateUserReviewsMediaItemProps<MT>): UserReviewsMediaItem<MT> => {
		const { mediaType, mediaItem, reviews = [], review, rating, content } = props;
		const { id: reviewID } = review || {};

		const updateUserReview: UserReview = review
			? {
					...review,
					rating: rating ? rating + 1 : undefined,
					content,
					updatedAt: dayjs(new Date()).toISOString()
			  }
			: {
					id: uuid(),
					rating: rating ? rating + 1 : undefined,
					content,
					updatedAt: '',
					createdAt: dayjs(new Date()).toISOString()
			  };
		const updatedUserReviews: UserReviews = review
			? reviews.map((review) => {
					if (review.id === reviewID) {
						return { ...updateUserReview };
					} else {
						return { ...review };
					}
			  })
			: [...reviews, updateUserReview];

		const updatedUserReviewsMediaItem: UserReviewsMediaItem<MT> = {
			mediaType,
			mediaItem,
			reviews: sort([...updatedUserReviews]).desc(({ updatedAt, createdAt }) => updatedAt || createdAt)
		};

		return { ...updatedUserReviewsMediaItem };
	}
);
type FilterUserReviewsMediaItemProps<MT extends ViewReviewsMediaType> = {
	reviews: UserReviews;
	review: UserReview;
} & Pick<ViewReviewsProps<MT>, 'mediaType' | 'mediaItem'>;

export const filterUserReviewsMediaItem = memoize(
	<MT extends ViewReviewsMediaType>(props: FilterUserReviewsMediaItemProps<MT>): UserReviewsMediaItem<MT> => {
		const { mediaType, mediaItem, reviews = [], review } = props;

		const updatedUserReviews: UserReviews = reviews.filter(({ id }) => id !== review.id);

		const updatedUserReviewsMediaItem: UserReviewsMediaItem<MT> = {
			mediaType,
			mediaItem,
			reviews: sort([...updatedUserReviews]).desc(({ updatedAt, createdAt }) => updatedAt || createdAt)
		};

		return { ...updatedUserReviewsMediaItem };
	}
);

type UpdateUserReviewsProps<MT extends ViewReviewsMediaType> = {
	mediaItems: UserReviewsMediaItems<MT>;
	updatedMediaItem: UserReviewsMediaItem<MT>;
} & Pick<ViewReviewsProps<MT>, 'mediaItem'>;

export const updateUserReviews = memoize(
	<MT extends ViewReviewsMediaType>({
		mediaItems = [],
		mediaItem: { id },
		updatedMediaItem
	}: UpdateUserReviewsProps<MT>): UserReviewsMediaItems<MT> => {
		const updateUserReviews: UserReviewsMediaItems<MT> = [];

		mediaItems.forEach((mediaItem) => {
			if (mediaItem.mediaItem.id === id) {
				updateUserReviews.push({ ...updatedMediaItem });
			} else {
				updateUserReviews.push({ ...mediaItem });
			}
		});

		return [...updateUserReviews];
	}
);
