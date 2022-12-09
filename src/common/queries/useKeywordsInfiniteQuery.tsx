import { useToast } from '@chakra-ui/react';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { useWillUnmount } from 'rooks';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { keywordsInfiniteQueryKey } from '../keys';
import { axios } from '../scripts';
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

const toastID = 'ds-edb-use-keywords-infinite-query-toast';

const useKeywordsInfiniteQuery = ({
	props: { query },
	config = {},
	options = {}
}: UseKeywordsInfiniteQueryParams): UseKeywordsInfiniteQueryResult => {
	const toast = useToast();

	const key = keywordsInfiniteQueryKey({ query });

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseKeywordsInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axios.get<UseKeywordsInfiniteQueryResponse>('/search/keyword', {
				...config,
				params: { ...config.params, query, page: pageParam || 1 },
				signal
			});
			return data;
		},
		{
			...options,
			enabled: options.enabled || !!query,
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
									`Unfortunately, something went wrong when trying to fetch "${query}" keywords.`,
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

export default useKeywordsInfiniteQuery;
