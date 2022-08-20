import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQuery } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { tvShowCertificationsQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Certifications, QueryError } from '../types';

export type UseTVShowCertificationsQueryOptions = UseQueryOptions<Certifications, AxiosError<QueryError>>;

export type UseTVShowCertificationsQueryResult = UseQueryResult<Certifications, AxiosError<QueryError>>;

type UseTVShowCertificationsQueryProps = Undefinable<{
	config?: AxiosConfig;
	options?: UseTVShowCertificationsQueryOptions;
}>;

const useTVShowCertificationsQuery = ({
	config = {},
	options = {}
}: UseTVShowCertificationsQueryProps = {}): UseTVShowCertificationsQueryResult => {
	const source = axios.CancelToken.source();

	// const toast = useToast();

	const query = useQuery<Certifications, AxiosError<QueryError>>(
		tvShowCertificationsQueryKey,
		async () => {
			const { data } = await axiosInstance.get<Certifications>('/certification/tv/list', {
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

export default useTVShowCertificationsQuery;
