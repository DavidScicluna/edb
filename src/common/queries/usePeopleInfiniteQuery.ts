import { Undefinable } from '@davidscicluna/component-library';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { peopleInfiniteQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, QueryError, Response } from '../types';
import { PartialPerson } from '../types/person';

export type UsePeopleInfiniteQueryResponse = Response<PartialPerson[]>;

export type UsePeopleInfiniteQueryOptions = Omit<
	UseInfiniteQueryOptions<UsePeopleInfiniteQueryResponse, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UsePeopleInfiniteQueryResult = UseInfiniteQueryResult<
	UsePeopleInfiniteQueryResponse,
	AxiosError<QueryError>
>;

type UsePeopleInfiniteQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UsePeopleInfiniteQueryOptions;
}>;

const usePeopleInfiniteQuery = ({
	config = {},
	options = {}
}: UsePeopleInfiniteQueryParams = {}): UsePeopleInfiniteQueryResult => {
	// const toast = useToast();

	const key = peopleInfiniteQueryKey({ params: config.params }) || ['people', config.params];

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UsePeopleInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axiosInstance.get<UsePeopleInfiniteQueryResponse>('/person/popular', {
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

export default usePeopleInfiniteQuery;
