import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { popularQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';

export type UsePopularQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UsePopularQueryProps = { mediaType: UsePopularQueryMediaType };

export type UsePopularQueryResponse<MT extends UsePopularQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
>;

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
	// const toast = useToast();

	const key = popularQueryKey({ mediaType }) || [`popular_${mediaType}`];

	const client = useQueryClient();
	const query = useQuery<UsePopularQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axiosInstance.get<UsePopularQueryResponse<MT>>(`/${mediaType}/popular`, {
				...config,
				signal
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

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default usePopularQuery;
