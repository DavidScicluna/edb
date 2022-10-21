import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { languagesQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, Language, QueryError } from '../types';

export type UseLanguagesQueryResponse = Language[];

export type UseLanguagesQueryOptions = UseQueryOptions<UseLanguagesQueryResponse, AxiosError<QueryError>>;

export type UseLanguagesQueryResult = UseQueryResult<UseLanguagesQueryResponse, AxiosError<QueryError>>;

type UseLanguagesQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseLanguagesQueryOptions;
}>;

const useLanguagesQuery = ({ config = {}, options = {} }: UseLanguagesQueryParams = {}): UseLanguagesQueryResult => {
	// const toast = useToast();

	const key = languagesQueryKey() || ['languages'];

	const client = useQueryClient();
	const query = useQuery<UseLanguagesQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axiosInstance.get<UseLanguagesQueryResponse>('/configuration/languages', {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			onError: (error) => {
				console.error(error.toJSON());

				// TODO: ADD Toast
				// const {} = error.response?.data || {};

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
