import { useConst } from '@chakra-ui/react';

import { UseInfiniteQueryResult, UseInfiniteQueryOptions, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { keywordsInfiniteQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Keyword, QueryError, Response } from '../types';

export type UseKeywordsInfiniteQueryResponse = Response<Keyword[]>;

export type UseKeywordsInfiniteQueryProps = { query: string };

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
	const controller = new AbortController();

	// const toast = useToast();

	const key = useConst<QueryKey>(keywordsInfiniteQueryKey({ query }));

	const infiniteQuery = useInfiniteQuery<UseKeywordsInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance.get<UseKeywordsInfiniteQueryResponse>('/search/keyword', {
				...config,
				params: { ...config.params, query, page: pageParam || 1 },
				signal: controller.signal
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

	useWillUnmount(() => controller.abort());

	return infiniteQuery;
};

export default useKeywordsInfiniteQuery;