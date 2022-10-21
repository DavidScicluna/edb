import { Undefinable } from '@davidscicluna/component-library';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { moviesInfiniteQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';

export type UseMoviesInfiniteQueryResponse = Response<PartialMovie[]>;

export type UseMoviesInfiniteQueryOptions = Omit<
	UseInfiniteQueryOptions<UseMoviesInfiniteQueryResponse, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseMoviesInfiniteQueryResult = UseInfiniteQueryResult<
	UseMoviesInfiniteQueryResponse,
	AxiosError<QueryError>
>;

type UseMoviesInfiniteQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseMoviesInfiniteQueryOptions;
}>;

const useMoviesInfiniteQuery = ({
	config = {},
	options = {}
}: UseMoviesInfiniteQueryParams = {}): UseMoviesInfiniteQueryResult => {
	// const toast = useToast();

	const key = moviesInfiniteQueryKey({ params: config.params }) || ['movies', config.params];

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseMoviesInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axiosInstance.get<UseMoviesInfiniteQueryResponse>('/discover/movie', {
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

export default useMoviesInfiniteQuery;
