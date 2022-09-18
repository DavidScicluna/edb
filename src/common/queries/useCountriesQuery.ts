import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { countriesQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Country, QueryError } from '../types';

export type UseCountriesQueryOptions = UseQueryOptions<Country[], AxiosError<QueryError>>;

export type UseCountriesQueryResult = UseQueryResult<Country[], AxiosError<QueryError>>;

type UseCountriesQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseCountriesQueryOptions;
}>;

const useCountriesQuery = ({ config = {}, options = {} }: UseCountriesQueryParams = {}): UseCountriesQueryResult => {
	const controller = new AbortController();

	// const toast = useToast();

	const query = useQuery<Country[], AxiosError<QueryError>>(
		countriesQueryKey,
		async () => {
			const { data } = await axiosInstance.get<Country[]>('/configuration/countries', {
				...config,
				signal: controller.signal
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

	useWillUnmount(() => controller.abort());

	return query;
};

export default useCountriesQuery;
