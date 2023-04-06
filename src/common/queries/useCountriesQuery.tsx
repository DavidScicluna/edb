import { Undefinable, Alert, utils } from '@davidscicluna/component-library';

import { useToast, useConst } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';

import { axios } from '../scripts';
import { AxiosConfig, Country, QueryError } from '../types';

const { convertDurationToMS } = utils;

export type UseCountriesQueryResponse = Country[];

export type UseCountriesQueryOptions = UseQueryOptions<UseCountriesQueryResponse, AxiosError<QueryError>>;

export type UseCountriesQueryResult = UseQueryResult<UseCountriesQueryResponse, AxiosError<QueryError>>;

type UseCountriesQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseCountriesQueryOptions;
}>;

export const countriesQueryToastID = memoize((): string => 'ds-edb-countries-query-toast');
export const countriesQueryKey = memoize((): QueryKey => ['ds-edb-countries-query']);

const useCountriesQuery = ({ config = {}, options = {} }: UseCountriesQueryParams = {}): UseCountriesQueryResult => {
	const toast = useToast();

	const toastID = useConst<string>(countriesQueryToastID());
	const key = useConst<QueryKey>(countriesQueryKey());

	const client = useQueryClient();
	const query = useQuery<UseCountriesQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseCountriesQueryResponse>('/configuration/countries', {
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
									'Unfortunately, something went wrong when trying to fetch countries.',
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

export default useCountriesQuery;
