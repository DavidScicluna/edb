import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

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

import { axios } from '../scripts';
import { AxiosConfig, Keyword, QueryError, Response } from '../types';

const { convertDurationToMS } = utils;

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

export const keywordsInfiniteQueryToastID = memoize(
	({ query }: UseKeywordsInfiniteQueryProps): string => `ds-edb-search-${query}-keywords-infinite-query-toast`
);
export const keywordsInfiniteQueryKey = memoize(
	({ query }: UseKeywordsInfiniteQueryProps): QueryKey => [`ds-edb-search-${query}-keywords-infinite-query`]
);

const useKeywordsInfiniteQuery = ({
	props: { query },
	config = {},
	options = {}
}: UseKeywordsInfiniteQueryParams): UseKeywordsInfiniteQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(keywordsInfiniteQueryToastID({ query }));
	const [key, setKey] = useState<QueryKey>(keywordsInfiniteQueryKey({ query }));

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
			enabled: String(options.enabled) ? options.enabled : !!query,
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

	useUpdateEffect(() => {
		const newToastID = keywordsInfiniteQueryToastID({ query });
		const newKey = keywordsInfiniteQueryKey({ query });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [query]);

	useWillUnmount(() => client.cancelQueries(key));

	return infiniteQuery;
};

export default useKeywordsInfiniteQuery;
