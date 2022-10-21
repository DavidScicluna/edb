import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { jobsQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, Job, QueryError } from '../types';

export type UseJobsQueryResponse = Job[];

export type UseJobsQueryOptions = UseQueryOptions<UseJobsQueryResponse, AxiosError<QueryError>>;

export type UseJobsQueryResult = UseQueryResult<UseJobsQueryResponse, AxiosError<QueryError>>;

type UseJobsQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseJobsQueryOptions;
}>;

const useJobsQuery = ({ config = {}, options = {} }: UseJobsQueryParams = {}): UseJobsQueryResult => {
	// const toast = useToast();

	const key = jobsQueryKey() || ['jobs'];

	const client = useQueryClient();
	const query = useQuery<UseJobsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axiosInstance.get<UseJobsQueryResponse>('/configuration/jobs', {
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

export default useJobsQuery;
