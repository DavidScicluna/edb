import { QueryKey } from '@tanstack/react-query';

import { memoize } from 'lodash';

import { UseCertificationsQueryProps } from '../queries/useCertificationsQuery';
import { UseGenresQueryProps } from '../queries/useGenresQuery';
import { UseKeywordsInfiniteQueryProps } from '../queries/useKeywordsInfiniteQuery';
import { UsePopularQueryProps } from '../queries/usePopularQuery';
import { UseSearchInfiniteQueryProps } from '../queries/useSearchInfiniteQuery';
import { UseTopRatedQueryProps } from '../queries/useTopRatedQuery';
import { UseTrendingQueryProps } from '../queries/useTrendingQuery';

export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`ds-edb-${mediaType}-certifications-query`]
);

export const countriesQueryKey = memoize((): QueryKey => ['ds-edb-countries-query']);

export const genresQueryKey = memoize(
	({ mediaType }: UseGenresQueryProps): QueryKey => [`ds-edb-${mediaType}-genres-query`]
);

export const jobsQueryKey = memoize((): QueryKey => ['ds-edb-jobs-query']);

export const keywordsInfiniteQueryKey = memoize(
	({ query }: UseKeywordsInfiniteQueryProps): QueryKey => [`ds-edb-search-${query}-keywords-infinite-query`]
);

export const languagesQueryKey = memoize((): QueryKey => ['ds-edb-languages-query']);

export const moviesInfiniteQueryKey = memoize((): QueryKey => ['ds-edb-movies-infinite-query']);

export const peopleInfiniteQueryKey = memoize((): QueryKey => ['ds-edb-people-infinite-query']);

export const personCreditsQueryKey = memoize(
	({ id }: UsePersonQueryProps): QueryKey => [`ds-edb-person-${id}-credits-query`]
);

export const personExternalIDsQueryKey = memoize(
	({ id }: UsePersonQueryProps): QueryKey => [`ds-edb-person-${id}-external-ids-query`]
);

export const personImagesQueryKey = memoize(
	({ id }: UsePersonQueryProps): QueryKey => [`ds-edb-person-${id}-images-query`]
);

export const personMovieCreditsQueryKey = memoize(
	({ id }: UsePersonQueryProps): QueryKey => [`ds-edb-person-${id}-movie-credits-query`]
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

export const tvShowsInfiniteQueryKey = memoize((): QueryKey => ['ds-edb-tv-shows-infinite-query']);
