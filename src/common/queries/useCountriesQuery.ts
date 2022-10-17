import { Undefinable } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { countriesQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Country, QueryError } from '../types';

export type UseCountriesQueryResponse = Country[];

export type UseCountriesQueryOptions = UseQueryOptions<UseCountriesQueryResponse, AxiosError<QueryError>>;

export type UseCountriesQueryResult = UseQueryResult<UseCountriesQueryResponse, AxiosError<QueryError>>;

type UseCountriesQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseCountriesQueryOptions;
}>;

const useCountriesQuery = ({ config = {}, options = {} }: UseCountriesQueryParams = {}): UseCountriesQueryResult => {
	// const toast = useToast();

	const key = useConst<QueryKey>(countriesQueryKey);

	const client = useQueryClient();
	const query = useQuery<UseCountriesQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axiosInstance.get<UseCountriesQueryResponse>('/configuration/countries', {
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

export default useCountriesQuery;
