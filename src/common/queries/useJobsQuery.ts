import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQuery } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { jobsQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Job, QueryError } from '../types';

export type UseJobsQueryOptions = UseQueryOptions<Job[], AxiosError<QueryError>>;

export type UseJobsQueryResult = UseQueryResult<Job[], AxiosError<QueryError>>;

type UseJobsQueryProps = Undefinable<{
	config?: AxiosConfig;
	options?: UseJobsQueryOptions;
}>;

const useJobsQuery = ({ config = {}, options = {} }: UseJobsQueryProps = {}): UseJobsQueryResult => {
	const source = axios.CancelToken.source();

	// const toast = useToast();

	const query = useQuery<Job[], AxiosError<QueryError>>(
		jobsQueryKey,
		async () => {
			const { data } = await axiosInstance.get<Job[]>('/configuration/jobs', {
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

export default useJobsQuery;
