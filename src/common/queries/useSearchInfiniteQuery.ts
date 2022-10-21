import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { searchInfiniteQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, MediaType, PartialCompany, QueryError, Response } from '../types';
import { Collection, PartialMovie } from '../types/movie';
import { PartialPerson } from '../types/person';
import { PartialTV } from '../types/tv';

export type UseSearchInfiniteQueryProps = { mediaType: MediaType; query: string };

export type UseSearchInfiniteQueryResponse<MT extends MediaType> = Response<
	MT extends 'movie'
		? PartialMovie[]
		: MT extends 'tv'
		? PartialTV[]
		: MT extends 'person'
		? PartialPerson[]
		: MT extends 'company'
		? PartialCompany[]
		: Collection[]
>;

export type UseSearchInfiniteQueryOptions<MT extends MediaType> = Omit<
	UseInfiniteQueryOptions<UseSearchInfiniteQueryResponse<MT>, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseSearchInfiniteQueryResult<MT extends MediaType> = UseInfiniteQueryResult<
	UseSearchInfiniteQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseSearchInfiniteQueryParams<MT extends MediaType> = {
	props: UseSearchInfiniteQueryProps;
	config?: AxiosConfig;
	options?: UseSearchInfiniteQueryOptions<MT>;
};

const useSearchInfiniteQuery = <MT extends MediaType>({
	props: { mediaType, query },
	config = {},
	options = {}
}: UseSearchInfiniteQueryParams<MT>): UseSearchInfiniteQueryResult<MT> => {
	// const toast = useToast();

	const key = searchInfiniteQueryKey({ mediaType, query }) || [`${query}_${mediaType}_search_infinite`];

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseSearchInfiniteQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axiosInstance.get<UseSearchInfiniteQueryResponse<MT>>(`/search/${mediaType}`, {
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

export default useSearchInfiniteQuery;
