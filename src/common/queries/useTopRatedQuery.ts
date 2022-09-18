import { useConst } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { topRatedQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';

export type UseTopRatedQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseTopRatedQueryResponse<MT extends UseTopRatedQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
>;

export type UseTopRatedQueryProps = { mediaType: UseTopRatedQueryMediaType };

export type UseTopRatedQueryOptions<MT extends UseTopRatedQueryMediaType> = UseQueryOptions<
	UseTopRatedQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UseTopRatedQueryResult<MT extends UseTopRatedQueryMediaType> = UseQueryResult<
	UseTopRatedQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseTopRatedQueryParams<MT extends UseTopRatedQueryMediaType> = {
	props: UseTopRatedQueryProps;
	config?: AxiosConfig;
	options?: UseTopRatedQueryOptions<MT>;
};

const useTopRatedQuery = <MT extends UseTopRatedQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UseTopRatedQueryParams<MT>): UseTopRatedQueryResult<MT> => {
	const controller = new AbortController();

	// const toast = useToast();

	const key = useConst<QueryKey>(topRatedQueryKey({ mediaType }));

	const query = useQuery<UseTopRatedQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async () => {
			const { data } = await axiosInstance.get<UseTopRatedQueryResponse<MT>>(`/${mediaType}/top_rated`, {
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

export default useTopRatedQuery;
