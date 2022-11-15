import { Undefinable } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { countriesQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, Country, QueryError } from '../types';

export type UseCountriesQueryResponse = Country[];

export type UseCountriesQueryOptions = UseQueryOptions<UseCountriesQueryResponse, AxiosError<QueryError>>;

export type UseCountriesQueryResult = UseQueryResult<UseCountriesQueryResponse, AxiosError<QueryError>>;

type UseCountriesQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseCountriesQueryOptions;
}>;

const toastID = 'ds-edb-use-countries-query-toast';

const useCountriesQuery = ({ config = {}, options = {} }: UseCountriesQueryParams = {}): UseCountriesQueryResult => {
	const toast = useToast();

	const key = countriesQueryKey() || ['countries'];

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
