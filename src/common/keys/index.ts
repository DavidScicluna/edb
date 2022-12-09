import { QueryKey } from '@tanstack/react-query';

import { memoize } from 'lodash';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';
import {
	UseDiscoverMediaTypeInfiniteQueryMediaType,
	UseDiscoverMediaTypeInfiniteQueryProps
} from '../queries/useDiscoverMediaTypeInfiniteQuery';
import { UseExternalIDsQueryProps } from '../queries/useExternalIDsQuery';
import { UseGenresQueryProps } from '../queries/useGenresQuery';
import { UseKeywordsInfiniteQueryProps } from '../queries/useKeywordsInfiniteQuery';
import { UseImagesQueryProps } from '../queries/useImagesQuery';
import { UseMediaTypeQueryMediaType, UseMediaTypeQueryProps } from '../queries/useMediaTypeQuery';
import { UsePersonMovieCreditsQueryProps } from '../queries/usePersonMovieCreditsQuery';
import { UsePersonTVShowCreditsQueryProps } from '../queries/usePersonTVShowCreditsQuery';
import { UsePopularQueryProps } from '../queries/usePopularQuery';
import { UseSearchInfiniteQueryProps } from '../queries/useSearchInfiniteQuery';
import { UseTopRatedQueryProps } from '../queries/useTopRatedQuery';
import { UseTrendingQueryProps } from '../queries/useTrendingQuery';
import { UseVideosQueryProps } from '../queries/useVideosQuery';

export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`ds-edb-${mediaType}-certifications-query`]
);

export const countriesQueryKey = memoize((): QueryKey => ['ds-edb-countries-query']);

export const discoverMediaTypeInfiniteQueryKey = memoize(
	<MT extends UseDiscoverMediaTypeInfiniteQueryMediaType>({
		mediaType
	}: UseDiscoverMediaTypeInfiniteQueryProps<MT>): QueryKey => [`ds-edb-discover-${mediaType}-infinite-query`]
);

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

export const peopleInfiniteQueryKey = memoize((): QueryKey => ['ds-edb-people-infinite-query']);
export const mediaTypeQueryKey = memoize(
	<MT extends UseMediaTypeQueryMediaType>({ mediaType, id }: UseMediaTypeQueryProps<MT>): QueryKey => [
		`ds-edb-${mediaType}-${id}-query`
	]
);


export const personMovieCreditsQueryKey = memoize(
	({ id }: UsePersonMovieCreditsQueryProps): QueryKey => [`ds-edb-person-${id}-movie-credits-query`]
);

export const personTVShowCreditsQueryKey = memoize(
	({ id }: UsePersonTVShowCreditsQueryProps): QueryKey => [`ds-edb-person-${id}-tv-show-credits-query`]
);

export const popularQueryKey = memoize(
	({ mediaType }: UsePopularQueryProps): QueryKey => [`ds-edb-popular-${mediaType}-query`]
);

export const searchInfiniteQueryKey = memoize(
	({ mediaType, query }: UseSearchInfiniteQueryProps): QueryKey => [
		`ds-edb-search-${query}-${mediaType}-infinite-query`
	]
);

export const topRatedQueryKey = memoize(
	({ mediaType }: UseTopRatedQueryProps): QueryKey => [`ds-edb-top-rated-${mediaType}-query`]
);

export const trendingQueryKey = memoize(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [`ds-edb-${time}-${mediaType}-trending-query`]
);

export const trendingInfiniteQueryKey = memoize(
	({ mediaType, time }: UseTrendingQueryProps): QueryKey => [`ds-edb-${time}-${mediaType}-trending-infinite-query`]
);

export const videosQueryKey = memoize(
	({ mediaType, id }: UseVideosQueryProps): QueryKey => [`ds-edb-${mediaType}-${id}-videos-query`]
);
