import { useToast } from '@chakra-ui/react';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { mediaTypeReviewsInfiniteQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response, Review } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';

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

const toastID = 'ds-edb-use-media-type-reviews-infinite-query-toast';

const useMediaTypeReviewsInfiniteQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeReviewsInfiniteQueryParams): UseMediaTypeReviewsInfiniteQueryResult => {
	const toast = useToast();

	const key = mediaTypeReviewsInfiniteQueryKey({ mediaType, id });

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
			enabled: options.enabled || !!id,
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

	useWillUnmount(() => client.cancelQueries(key));

	return infiniteQuery;
};

export default useMediaTypeReviewsInfiniteQuery;
