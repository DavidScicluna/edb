import { QueryKey } from '@tanstack/react-query';

import { memoize } from 'lodash';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';
import { UseExternalIDsQueryProps } from '../queries/useExternalIDsQuery';
import { UseGenresQueryProps } from '../queries/useGenresQuery';
import { UseKeywordsInfiniteQueryProps } from '../queries/useKeywordsInfiniteQuery';
import { UseImagesQueryProps } from '../queries/useImagesQuery';
import {
	UseMediaTypeInfiniteQueryMediaType,
	UseMediaTypeInfiniteQueryProps
} from '../queries/useMediaTypeInfiniteQuery';
import { UseMediaTypeQueryMediaType, UseMediaTypeQueryProps } from '../queries/useMediaTypeQuery';
import {
	UseMediaTypeRecommendationsQueryMediaType,
	UseMediaTypeRecommendationsQueryProps
} from '../queries/useMediaTypeRecommendationsQuery';
import { UseMediaTypeReviewsInfiniteQueryProps } from '../queries/useMediaTypeReviewsInfiniteQuery';
import { UseMediaTypeSimilarQueryMediaType, UseMediaTypeSimilarQueryProps } from '../queries/useMediaTypeSimilarQuery';
import { UsePersonCreditsQueryMediaType, UsePersonCreditsQueryProps } from '../queries/usePersonCreditsQuery';
import { UsePopularQueryMediaType, UsePopularQueryProps } from '../queries/usePopularQuery';
import { UseSearchInfiniteQueryMediaType, UseSearchInfiniteQueryProps } from '../queries/useSearchInfiniteQuery';
import { UseTopRatedQueryMediaType, UseTopRatedQueryProps } from '../queries/useTopRatedQuery';
import { UseTrendingInfiniteQueryMediaType, UseTrendingInfiniteQueryProps } from '../queries/useTrendingInfiniteQuery';
import { UseTrendingQueryMediaType, UseTrendingQueryProps } from '../queries/useTrendingQuery';
import { UseVideosQueryProps } from '../queries/useVideosQuery';

export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`ds-edb-${mediaType}-certifications-query`]
);

export const countriesQueryKey = memoize((): QueryKey => ['ds-edb-countries-query']);

export const externalIDsQueryKey = memoize(
	({ mediaType, id }: UseExternalIDsQueryProps): QueryKey => [`ds-edb-${mediaType}-${id}-external-ids-query`]
);

export const genresQueryKey = memoize(
	({ mediaType }: UseGenresQueryProps): QueryKey => [`ds-edb-${mediaType}-genres-query`]
);

export const imagesQueryKey = memoize(
	({ mediaType, id }: UseImagesQueryProps): QueryKey => [`ds-edb-${mediaType}-${id}-images-query`]
);

export const jobsQueryKey = memoize((): QueryKey => ['ds-edb-jobs-query']);

export const keywordsInfiniteQueryKey = memoize(
	({ query }: UseKeywordsInfiniteQueryProps): QueryKey => [`ds-edb-search-${query}-keywords-infinite-query`]
);

export const languagesQueryKey = memoize((): QueryKey => ['ds-edb-languages-query']);

export const mediaTypeInfiniteQueryKey = memoize(
	<MT extends UseMediaTypeInfiniteQueryMediaType>({ mediaType }: UseMediaTypeInfiniteQueryProps<MT>): QueryKey => [
		`ds-edb-${mediaType}-infinite-query`
	]
);

export const mediaTypeQueryKey = memoize(
	<MT extends UseMediaTypeQueryMediaType>({ mediaType, id }: UseMediaTypeQueryProps<MT>): QueryKey => [
		`ds-edb-${mediaType}-${id}-query`
	]
);

export const peopleInfiniteQueryKey = memoize((): QueryKey => ['ds-edb-people-infinite-query']);
export const mediaTypeRecommendationsQueryKey = memoize(
	<MT extends UseMediaTypeRecommendationsQueryMediaType>({
		mediaType,
		id
	}: UseMediaTypeRecommendationsQueryProps<MT>): QueryKey => [`ds-edb-${mediaType}-${id}-recommendations-query`]
);

export const mediaTypeReviewsInfiniteQueryKey = memoize(
	({ mediaType, id }: UseMediaTypeReviewsInfiniteQueryProps): QueryKey => [
		`ds-edb-${mediaType}-${id}-reviews-infinite-query`
	]
);

export const mediaTypeSimilarQueryKey = memoize(
	<MT extends UseMediaTypeSimilarQueryMediaType>({ mediaType, id }: UseMediaTypeSimilarQueryProps<MT>): QueryKey => [
		`ds-edb-${mediaType}-${id}-similar-query`
	]
);

export const personCreditsQueryKey = memoize(
	<MT extends UsePersonCreditsQueryMediaType>({ mediaType, id }: UsePersonCreditsQueryProps<MT>): QueryKey => [
		`ds-edb-person-${id}-${mediaType}-credits-query`
	]
);

export const popularQueryKey = memoize(
	<MT extends UsePopularQueryMediaType>({ mediaType }: UsePopularQueryProps<MT>): QueryKey => [
		`ds-edb-popular-${mediaType}-query`
	]
);

export const searchInfiniteQueryKey = memoize(
	<MT extends UseSearchInfiniteQueryMediaType>({ mediaType, query }: UseSearchInfiniteQueryProps<MT>): QueryKey => [
		`ds-edb-search-${query}-${mediaType}-infinite-query`
	]
);

export const topRatedQueryKey = memoize(
	<MT extends UseTopRatedQueryMediaType>({ mediaType }: UseTopRatedQueryProps<MT>): QueryKey => [
		`ds-edb-top-rated-${mediaType}-query`
	]
);

export const trendingInfiniteQueryKey = memoize(
	<MT extends UseTrendingInfiniteQueryMediaType>({
		mediaType,
		time
	}: UseTrendingInfiniteQueryProps<MT>): QueryKey => [`ds-edb-${time}-${mediaType}-trending-infinite-query`]
);

export const trendingQueryKey = memoize(
	<MT extends UseTrendingQueryMediaType>({ mediaType, time }: UseTrendingQueryProps<MT>): QueryKey => [
		`ds-edb-${time}-${mediaType}-trending-query`
	]
);

export const videosQueryKey = memoize(
	({ mediaType, id }: UseVideosQueryProps): QueryKey => [`ds-edb-${mediaType}-${id}-videos-query`]
);
