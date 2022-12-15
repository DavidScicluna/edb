import { Undefinable } from '@davidscicluna/component-library';

import { useToast, useConst } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';

import { axios } from '../scripts';
import { AxiosConfig, Job, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';

export type UseJobsQueryResponse = Job[];

export type UseJobsQueryOptions = UseQueryOptions<UseJobsQueryResponse, AxiosError<QueryError>>;

export type UseJobsQueryResult = UseQueryResult<UseJobsQueryResponse, AxiosError<QueryError>>;

type UseJobsQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseJobsQueryOptions;
}>;

export const jobsQueryToastID = memoize((): string => 'ds-edb-jobs-query-toast');
export const jobsQueryKey = memoize((): QueryKey => ['ds-edb-jobs-query']);

const useJobsQuery = ({ config = {}, options = {} }: UseJobsQueryParams = {}): UseJobsQueryResult => {
	const toast = useToast();

	const toastID = useConst<string>(jobsQueryToastID());
	const key = useConst<QueryKey>(jobsQueryKey());

	const client = useQueryClient();
	const query = useQuery<UseJobsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseJobsQueryResponse>('/configuration/jobs', {
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
									'Unfortunately, something went wrong when trying to fetch jobs.',
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

export default useJobsQuery;
