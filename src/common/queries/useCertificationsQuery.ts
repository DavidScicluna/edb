import { useConst } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { certificationsQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Certifications, MediaType, QueryError } from '../types';

export type UseCertificationsQueryProps = { mediaType: Exclude<MediaType, 'person' | 'company' | 'collection'> };

export type UseCertificationsQueryOptions = UseQueryOptions<Certifications, AxiosError<QueryError>>;

export type UseCertificationsQueryResult = UseQueryResult<Certifications, AxiosError<QueryError>>;

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
	const controller = new AbortController();

	// const toast = useToast();

	const key = useConst<QueryKey>(certificationsQueryKey({ mediaType }));

	const query = useQuery<Certifications, AxiosError<QueryError>>(
		key,
		async () => {
			const { data } = await axiosInstance.get<Certifications>(`/certification/${mediaType}/list`, {
				...config,
				signal: controller.signal
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

	useWillUnmount(() => controller.abort());

	return query;
};

export default useCertificationsQuery;
