import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { keywordsInfiniteQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, Keyword, QueryError, Response } from '../types';

export type UseKeywordsInfiniteQueryProps = { query: string };

export type UseKeywordsInfiniteQueryResponse = Response<Keyword[]>;

export type UseKeywordsInfiniteQueryOptions = Omit<
	UseInfiniteQueryOptions<UseKeywordsInfiniteQueryResponse, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseKeywordsInfiniteQueryResult = UseInfiniteQueryResult<
	UseKeywordsInfiniteQueryResponse,
	AxiosError<QueryError>
>;

type UseKeywordsInfiniteQueryParams = {
	props: UseKeywordsInfiniteQueryProps;
	config?: AxiosConfig;
	options?: UseKeywordsInfiniteQueryOptions;
};

const useKeywordsInfiniteQuery = ({
	props: { query },
	config = {},
	options = {}
}: UseKeywordsInfiniteQueryParams): UseKeywordsInfiniteQueryResult => {
	// const toast = useToast();

	const key = keywordsInfiniteQueryKey({ query }) || [`${query}_search_keywords_infinite`];

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseKeywordsInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axiosInstance.get<UseKeywordsInfiniteQueryResponse>('/search/keyword', {
				...config,
				params: { ...config.params, query, page: pageParam || 1 },
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

export default useKeywordsInfiniteQuery;
