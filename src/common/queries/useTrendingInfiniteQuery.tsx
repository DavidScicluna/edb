import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	QueryKey,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact, memoize } from 'lodash';
import { useWillUnmount } from 'rooks';
import { useUpdateEffect } from 'usehooks-ts';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTVShow } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';

export type UseTrendingInfiniteQueryMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type UseTrendingInfiniteQueryProps<MT extends UseTrendingInfiniteQueryMediaType> = {
	mediaType: MT;
	time: 'day' | 'week';
};

export type UseTrendingInfiniteQueryResponse<MT extends UseTrendingInfiniteQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTVShow[]
>;

export type UseTrendingInfiniteQueryOptions<MT extends UseTrendingInfiniteQueryMediaType> = Omit<
	UseInfiniteQueryOptions<UseTrendingInfiniteQueryResponse<MT>, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseTrendingInfiniteQueryResult<MT extends UseTrendingInfiniteQueryMediaType> = UseInfiniteQueryResult<
	UseTrendingInfiniteQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseTrendingInfiniteQueryParams<MT extends UseTrendingInfiniteQueryMediaType> = {
	props: UseTrendingInfiniteQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseTrendingInfiniteQueryOptions<MT>;
};

export const trendingInfiniteQueryToastID = memoize(
	<MT extends UseTrendingInfiniteQueryMediaType>({ mediaType, time }: UseTrendingInfiniteQueryProps<MT>): string =>
		`ds-edb-trending-${time}-${mediaType}-infinite-query-toast`
);
export const trendingInfiniteQueryKey = memoize(
	<MT extends UseTrendingInfiniteQueryMediaType>({
		mediaType,
		time
	}: UseTrendingInfiniteQueryProps<MT>): QueryKey => [`ds-edb-trending-${time}-${mediaType}-infinite-query`]
);

const useTrendingInfiniteQuery = <MT extends UseTrendingInfiniteQueryMediaType>({
	props: { mediaType, time },
	config = {},
	options = {}
}: UseTrendingInfiniteQueryParams<MT>): UseTrendingInfiniteQueryResult<MT> => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(trendingInfiniteQueryToastID({ mediaType, time }));
	const [key, setKey] = useState<QueryKey>(trendingInfiniteQueryKey({ mediaType, time }));

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseTrendingInfiniteQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axios.get<UseTrendingInfiniteQueryResponse<MT>>(`/trending/${mediaType}/${time}`, {
				...config,
				params: { ...config.params, page: pageParam || 1 },
				signal
			});
			return data;
		},
		{
			...options,
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
									`Unfortunately, something went wrong when trying to fetch trending ${formatMediaTypeLabel(
										{ type: 'multiple', mediaType }
									)}.`,
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
		const newToastID = trendingInfiniteQueryToastID({ mediaType, time });
		const newKey = trendingInfiniteQueryKey({ mediaType, time });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [mediaType, time]);

	useWillUnmount(() => client.cancelQueries(key));

	return infiniteQuery;
};

export default useTrendingInfiniteQuery;
