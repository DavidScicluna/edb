import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	QueryKey,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response, Review } from '../types';
import { formatMediaTypeLabel } from '../utils';

const { convertDurationToMS } = utils;

export type UseMediaTypeReviewsInfiniteQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseMediaTypeReviewsInfiniteQueryProps = {
	mediaType: UseMediaTypeReviewsInfiniteQueryMediaType;
	id: number;
};

export type UseMediaTypeReviewsInfiniteQueryResponse = Response<Review[]>;

export type UseMediaTypeReviewsInfiniteQueryOptions = Omit<
	UseInfiniteQueryOptions<UseMediaTypeReviewsInfiniteQueryResponse, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseMediaTypeReviewsInfiniteQueryResult = UseInfiniteQueryResult<
	UseMediaTypeReviewsInfiniteQueryResponse,
	AxiosError<QueryError>
>;

type UseMediaTypeReviewsInfiniteQueryParams = {
	props: UseMediaTypeReviewsInfiniteQueryProps;
	config?: AxiosConfig;
	options?: UseMediaTypeReviewsInfiniteQueryOptions;
};

export const mediaTypeReviewsInfiniteQueryToastID = memoize(
	({ mediaType, id }: UseMediaTypeReviewsInfiniteQueryProps): string =>
		`ds-edb-${mediaType}-${id}-reviews-infinite-query-toast`
);
export const mediaTypeReviewsInfiniteQueryKey = memoize(
	({ mediaType, id }: UseMediaTypeReviewsInfiniteQueryProps): QueryKey => [
		`ds-edb-${mediaType}-${id}-reviews-infinite-query`
	]
);

const useMediaTypeReviewsInfiniteQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeReviewsInfiniteQueryParams): UseMediaTypeReviewsInfiniteQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(mediaTypeReviewsInfiniteQueryToastID({ mediaType, id }));
	const [key, setKey] = useState<QueryKey>(mediaTypeReviewsInfiniteQueryKey({ mediaType, id }));

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseMediaTypeReviewsInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axios.get<UseMediaTypeReviewsInfiniteQueryResponse>(`/${mediaType}/${id}/reviews`, {
				...config,
				params: { ...config.params, page: pageParam || 1 },
				signal
			});
			return data;
		},
		{
			...options,
			enabled: String(options.enabled) ? options.enabled : !!id,
			getPreviousPageParam: (firstPage) => {
				return firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false;
			},
			getNextPageParam: (lastPage) => {
				return lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false;
			},
			onError: (error) => {
				console.error(error.toJSON());

				const { status_code, status_message } = error.response?.data || {};

				if (!toast.isActive(toastID)) {
					toast({
						id: toastID,
						duration: convertDurationToMS(),
						position: 'bottom-left',
						render: () => (
							<Alert
								duration={12.5}
								description={compact([
									status_code ? `${status_code}.` : null,
									`Unfortunately, something went wrong when trying to fetch ${formatMediaTypeLabel({
										type: 'single',
										mediaType
									})} reviews.`,
									status_message ? `(${status_message})` : null
								]).join(' ')}
								status='error'
								onClose={() => toast.close(toastID)}
							/>
						)
					});
				}

				if (options.onError) {
					options.onError(error);
				}
			}
		}
	);

	useUpdateEffect(() => {
		const newToastID = mediaTypeReviewsInfiniteQueryToastID({ mediaType, id });
		const newKey = mediaTypeReviewsInfiniteQueryKey({ mediaType, id });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [mediaType, id]);

	useWillUnmount(() => client.cancelQueries(key));

	return infiniteQuery;
};

export default useMediaTypeReviewsInfiniteQuery;
