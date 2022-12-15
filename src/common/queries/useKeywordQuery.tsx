import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, Keyword, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';

export type UseKeywordQueryProps = Pick<Keyword, 'id'>;

export type UseKeywordQueryResponse = Keyword;

export type UseKeywordQueryOptions = UseQueryOptions<UseKeywordQueryResponse, AxiosError<QueryError>>;

export type UseKeywordQueryResult = UseQueryResult<UseKeywordQueryResponse, AxiosError<QueryError>>;

type UseKeywordQueryParams = {
	props: UseKeywordQueryProps;
	config?: AxiosConfig;
	options?: UseKeywordQueryOptions;
};

export const keywordQueryToastID = memoize(
	({ id }: UseKeywordQueryProps): string => `ds-edb-keywords-${id}-query-toast`
);
export const keywordQueryKey = memoize(({ id }: UseKeywordQueryProps): QueryKey => [`ds-edb-keywords-${id}-query`]);

const useKeywordQuery = ({
	props: { id },
	config = {},
	options = {}
}: UseKeywordQueryParams): UseKeywordQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(keywordQueryToastID({ id }));
	const [key, setKey] = useState<QueryKey>(keywordQueryKey({ id }));

	const client = useQueryClient();
	const query = useQuery<UseKeywordQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseKeywordQueryResponse>(`/keyword/${id}`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
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
		}
	);

	useUpdateEffect(() => {
		const newToastID = keywordQueryToastID({ id });
		const newKey = keywordQueryKey({ id });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [query]);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useKeywordQuery;
