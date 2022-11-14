import { Undefinable } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { languagesQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, Language, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';

export type UseLanguagesQueryResponse = Language[];

export type UseLanguagesQueryOptions = UseQueryOptions<UseLanguagesQueryResponse, AxiosError<QueryError>>;

export type UseLanguagesQueryResult = UseQueryResult<UseLanguagesQueryResponse, AxiosError<QueryError>>;

type UseLanguagesQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseLanguagesQueryOptions;
}>;

const toastID = 'ds-edb-use-languages-query-toast';

const useLanguagesQuery = ({ config = {}, options = {} }: UseLanguagesQueryParams = {}): UseLanguagesQueryResult => {
	const toast = useToast();

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

				const { status_code, status_message } = error.response?.data || {};

				if (!toast.isActive(toastID)) {
					toast({
						id: toastID,
						duration: convertDurationToMS(),
						position: 'bottom-left',
						render: () => (
							<Alert
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
