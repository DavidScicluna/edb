import { Undefinable } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, merge } from 'lodash';

import { moviesInfiniteQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';

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

const toastID = 'ds-edb-use-movies-infinite-query-toast';

const useMoviesInfiniteQuery = ({
	config = {},
	options = {}
}: UseMoviesInfiniteQueryParams = {}): UseMoviesInfiniteQueryResult => {
	const toast = useToast();

	const key = moviesInfiniteQueryKey();

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseMoviesInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axios.get<UseMoviesInfiniteQueryResponse>('/discover/movie', {
				...config,
				params: merge({ ...config.params, page: pageParam }),
				signal
			});
			return data;
		},
		{
			...options,
			keepPreviousData: options.keepPreviousData || true,
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
										type: 'multiple',
										mediaType: 'movie'
									})}.`,
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

export default useMoviesInfiniteQuery;
