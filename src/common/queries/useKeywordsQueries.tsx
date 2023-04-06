import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQueries } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact, memoize } from 'lodash';
import { useWillUnmount } from 'rooks';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, Keyword, QueryError } from '../types';

const { convertDurationToMS } = utils;

export type UseKeywordsQueriesProps = { keywords: Keyword['id'][] };

export type UseKeywordsQueriesResponse = Keyword;

export type UseKeywordsQueriesOptions = UseQueryOptions<UseKeywordsQueriesResponse, AxiosError<QueryError>>;

export type UseKeywordsQueriesResult = UseQueryResult<UseKeywordsQueriesResponse, AxiosError<QueryError>>;

type UseKeywordsQueriesParams = {
	props: UseKeywordsQueriesProps;
	config?: AxiosConfig;
	options?: UseKeywordsQueriesOptions;
};

// export const keywordsQuery = memoize(
// 	({ query }: UseKeywordsQueriesProps): string => `ds-edb-search-${query}-keywords--query`
// );
export const keywordsQueriesToastIDs = memoize(({ keywords = [] }: UseKeywordsQueriesProps): string[] =>
	keywords.map((keyword) => `ds-edb-keywords-${keyword}-query-toast`)
);
export const keywordsQueriesKeys = memoize(({ keywords = [] }: UseKeywordsQueriesProps): QueryKey[] =>
	keywords.map((keyword) => [`ds-edb-keywords-${keyword}-query`])
);

const useKeywordsQueries = ({
	props: { keywords = [] },
	config = {},
	options = {}
}: UseKeywordsQueriesParams): UseKeywordsQueriesResult[] => {
	const toast = useToast();

	const [toastIDs, setToastIDs] = useState<string[]>(keywordsQueriesToastIDs({ keywords }));
	const [keys, setKeys] = useState<QueryKey[]>(keywordsQueriesKeys({ keywords }));

	const client = useQueryClient();
	const queries = useQueries({
		queries: keywords.map<UseKeywordsQueriesOptions>((keyword, index) => {
			return {
				queryKey: keys[index],
				queryFn: async ({ signal }) => {
					const { data } = await axios.get<UseKeywordsQueriesResponse>(`/keyword/${keyword}`, {
						...config,
						signal
					});
					return data;
				},
				onError: (error) => {
					const toastID = toastIDs[index];

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
										`Unfortunately, something went wrong when trying to fetch keyword.`,
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
			};
		})
	});

	useUpdateEffect(() => {
		const newToastID = keywordsQueriesToastIDs({ keywords });
		const newKey = keywordsQueriesKeys({ keywords });

		if (newToastID !== toastIDs) {
			setToastIDs(newToastID);
		}

		if (newKey !== keys) {
			setKeys(newKey);
		}
	}, [keywords]);

	useWillUnmount(() => client.cancelQueries(keys));

	return queries;
};

export default useKeywordsQueries;
