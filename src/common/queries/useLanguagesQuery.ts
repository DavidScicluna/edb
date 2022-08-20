import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQuery } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { languagesQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Language, QueryError } from '../types';

export type UseLanguagesQueryOptions = UseQueryOptions<Language[], AxiosError<QueryError>>;

export type UseLanguagesQueryResult = UseQueryResult<Language[], AxiosError<QueryError>>;

type UseLanguagesQueryProps = Undefinable<{
	config?: AxiosConfig;
	options?: UseLanguagesQueryOptions;
}>;

const useLanguagesQuery = ({ config = {}, options = {} }: UseLanguagesQueryProps = {}): UseLanguagesQueryResult => {
	const source = axios.CancelToken.source();

	// const toast = useToast();

	const query = useQuery<Language[], AxiosError<QueryError>>(
		languagesQueryKey,
		async () => {
			const { data } = await axiosInstance.get<Language[]>('/configuration/languages', {
				...config,
				cancelToken: source.token
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

	useWillUnmount(() => source.cancel());

	return query;
};

export default useLanguagesQuery;
