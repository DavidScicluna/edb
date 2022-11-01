import { Undefinable } from '@davidscicluna/component-library';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { tvShowsInfiniteQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, QueryError, Response } from '../types';
import { PartialTV } from '../types/tv';

export type UseTVShowsInfiniteQueryResponse = Response<PartialTV[]>;

export type UseTVShowsInfiniteQueryOptions = Omit<
	UseInfiniteQueryOptions<UseTVShowsInfiniteQueryResponse, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseTVShowsInfiniteQueryResult = UseInfiniteQueryResult<
	UseTVShowsInfiniteQueryResponse,
	AxiosError<QueryError>
>;

type UseTVShowsInfiniteQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseTVShowsInfiniteQueryOptions;
}>;

const useTVShowsInfiniteQuery = ({
	config = {},
	options = {}
}: UseTVShowsInfiniteQueryParams = {}): UseTVShowsInfiniteQueryResult => {
	// const toast = useToast();

	const key = tvShowsInfiniteQueryKey({ params: config.params }) || ['tv_shows', config.params];

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseTVShowsInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axiosInstance.get<UseTVShowsInfiniteQueryResponse>('/discover/tv', {
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

				// TODO: ADD Toast | Set Toast with action to refetch & add progress bar
				// & time label to show when notification will close
				// const {} = error.response?.data || {};

				if (options.onError) {
					options.onError(error);
				}
			}
		}
	);

	useWillUnmount(() => client.cancelQueries(key));

	return infiniteQuery;
};

export default useTVShowsInfiniteQuery;
