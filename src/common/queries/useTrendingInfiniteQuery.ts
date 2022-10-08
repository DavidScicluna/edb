import { useConst } from '@chakra-ui/react';

import { UseInfiniteQueryResult, UseInfiniteQueryOptions, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { trendingInfiniteQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';

export type UseTrendingInfiniteQueryMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type UseTrendingInfiniteQueryResponse<MT extends UseTrendingInfiniteQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
>;

export type UseTrendingInfiniteQueryProps = { mediaType: UseTrendingInfiniteQueryMediaType; time: 'day' | 'week' };

export type UseTrendingInfiniteQueryOptions<MT extends UseTrendingInfiniteQueryMediaType> = Omit<
	UseInfiniteQueryOptions<UseTrendingInfiniteQueryResponse<MT>, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseTrendingInfiniteQueryResult<MT extends UseTrendingInfiniteQueryMediaType> = UseInfiniteQueryResult<
	UseTrendingInfiniteQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseTrendingInfiniteQueryParams<MT extends UseTrendingInfiniteQueryMediaType> = {
	props: UseTrendingInfiniteQueryProps;
	config?: AxiosConfig;
	options?: UseTrendingInfiniteQueryOptions<MT>;
};

const useTrendingInfiniteQuery = <MT extends UseTrendingInfiniteQueryMediaType>({
	props: { mediaType, time },
	config = {},
	options = {}
}: UseTrendingInfiniteQueryParams<MT>): UseTrendingInfiniteQueryResult<MT> => {
	const controller = new AbortController();

	// const toast = useToast();

	const key = useConst<QueryKey>(trendingInfiniteQueryKey({ mediaType, time }));

	const infiniteQuery = useInfiniteQuery<UseTrendingInfiniteQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance.get<UseTrendingInfiniteQueryResponse<MT>>(
				`/trending/${mediaType}/${time}`,
				{
					...config,
					params: { ...config.params, page: pageParam || 1 },
					signal: controller.signal
				}
			);
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

				// TODO: ADD Toast | Set Toast with action to refetch & add progress bar
				// & time label to show when notification will close
				// const {} = error.response?.data || {};

				if (options.onError) {
					options.onError(error);
				}
			}
		}
	);

	useWillUnmount(() => controller.abort());

	return infiniteQuery;
};

export default useTrendingInfiniteQuery;
