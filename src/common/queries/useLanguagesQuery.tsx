import { Undefinable, Alert, utils } from '@davidscicluna/component-library';

import { useToast, useConst } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';

import { axios } from '../scripts';
import { AxiosConfig, Language, QueryError } from '../types';

const { convertDurationToMS } = utils;

export type UseLanguagesQueryResponse = Language[];

export type UseLanguagesQueryOptions = UseQueryOptions<UseLanguagesQueryResponse, AxiosError<QueryError>>;

export type UseLanguagesQueryResult = UseQueryResult<UseLanguagesQueryResponse, AxiosError<QueryError>>;

type UseLanguagesQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseLanguagesQueryOptions;
}>;

export const languagesQueryToastID = memoize((): string => 'ds-edb-languages-query-toast');
export const languagesQueryKey = memoize((): QueryKey => ['ds-edb-languages-query']);

const useLanguagesQuery = ({ config = {}, options = {} }: UseLanguagesQueryParams = {}): UseLanguagesQueryResult => {
	const toast = useToast();

	const toastID = useConst<string>(languagesQueryToastID());
	const key = useConst<QueryKey>(languagesQueryKey());

	const client = useQueryClient();
	const query = useQuery<UseLanguagesQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseLanguagesQueryResponse>('/configuration/languages', {
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
									'Unfortunately, something went wrong when trying to fetch languages.',
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

	return query;
};

export default useLanguagesQuery;
