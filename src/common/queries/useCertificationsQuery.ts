import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { certificationsQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, Certifications, MediaType, QueryError } from '../types';

export type UseCertificationsQueryProps = { mediaType: Exclude<MediaType, 'person' | 'company' | 'collection'> };

export type UseCertificationsQueryResponse = Certifications;

export type UseCertificationsQueryOptions = UseQueryOptions<UseCertificationsQueryResponse, AxiosError<QueryError>>;

export type UseCertificationsQueryResult = UseQueryResult<UseCertificationsQueryResponse, AxiosError<QueryError>>;

type UseCertificationsQueryParams = {
	props: UseCertificationsQueryProps;
	config?: AxiosConfig;
	options?: UseCertificationsQueryOptions;
};

const useCertificationsQuery = ({
	props: { mediaType },
	config = {},
	options = {}
}: UseCertificationsQueryParams): UseCertificationsQueryResult => {
	// const toast = useToast();

	const key = certificationsQueryKey({ mediaType }) || [`${mediaType}_certifications`];

	const client = useQueryClient();
	const query = useQuery<UseCertificationsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axiosInstance.get<UseCertificationsQueryResponse>(
				`/certification/${mediaType}/list`,
				{
					...config,
					signal
				}
			);
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

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useCertificationsQuery;
