import { useConst } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { popularQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';

export type UsePopularQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UsePopularQueryResponse<MT extends UsePopularQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
>;

export type UsePopularQueryProps = { mediaType: UsePopularQueryMediaType };

export type UsePopularQueryOptions<MT extends UsePopularQueryMediaType> = UseQueryOptions<
	UsePopularQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UsePopularQueryResult<MT extends UsePopularQueryMediaType> = UseQueryResult<
	UsePopularQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UsePopularQueryParams<MT extends UsePopularQueryMediaType> = {
	props: UsePopularQueryProps;
	config?: AxiosConfig;
	options?: UsePopularQueryOptions<MT>;
};

const usePopularQuery = <MT extends UsePopularQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UsePopularQueryParams<MT>): UsePopularQueryResult<MT> => {
	const controller = new AbortController();

	// const toast = useToast();

	const key = useConst<QueryKey>(popularQueryKey({ mediaType }));

	const query = useQuery<UsePopularQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async () => {
			const { data } = await axiosInstance.get<UsePopularQueryResponse<MT>>(`/${mediaType}/popular`, {
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

export default usePopularQuery;
