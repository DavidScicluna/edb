import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQuery } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { movieCertificationsQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Certifications, QueryError } from '../types';

export type UseMovieCertificationsQueryOptions = UseQueryOptions<Certifications, AxiosError<QueryError>>;

export type UseMovieCertificationsQueryResult = UseQueryResult<Certifications, AxiosError<QueryError>>;

type UseMovieCertificationsQueryProps = Undefinable<{
	config?: AxiosConfig;
	options?: UseMovieCertificationsQueryOptions;
}>;

const useMovieCertificationsQuery = ({
	config = {},
	options = {}
}: UseMovieCertificationsQueryProps = {}): UseMovieCertificationsQueryResult => {
	const source = axios.CancelToken.source();

	// const toast = useToast();

	const query = useQuery<Certifications, AxiosError<QueryError>>(
		movieCertificationsQueryKey,
		async () => {
			const { data } = await axiosInstance.get<Certifications>('/certification/movie/list', {
				...config,
				cancelToken: source.token
			});
			return data;
		},
		{
			...options,
			onError: (error) => {
				console.error(error.toJSON());

				// TODO: ADD Toast | Set Toast with action to refetch & add progress bar
				// & time label to show when notification will close
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

export default useMovieCertificationsQuery;
