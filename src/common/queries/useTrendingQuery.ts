import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { trendingQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';

export type UseTrendingQueryMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type UseTrendingQueryProps = { mediaType: UseTrendingQueryMediaType; time: 'day' | 'week' };

export type UseTrendingQueryResponse<MT extends UseTrendingQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
>;

export type UseTrendingQueryOptions<MT extends UseTrendingQueryMediaType> = UseQueryOptions<
	UseTrendingQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UseTrendingQueryResult<MT extends UseTrendingQueryMediaType> = UseQueryResult<
	UseTrendingQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseTrendingQueryParams<MT extends UseTrendingQueryMediaType> = {
	props: UseTrendingQueryProps;
	config?: AxiosConfig;
	options?: UseTrendingQueryOptions<MT>;
};

const useTrendingQuery = <MT extends UseTrendingQueryMediaType>({
	props: { mediaType, time },
	config = {},
	options = {}
}: UseTrendingQueryParams<MT>): UseTrendingQueryResult<MT> => {
	// const toast = useToast();

	const key = trendingQueryKey({ mediaType, time }) || [`${time}_${mediaType}_trending_infinite`];

	const client = useQueryClient();
	const query = useQuery<UseTrendingQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axiosInstance.get<UseTrendingQueryResponse<MT>>(`/trending/${mediaType}/${time}`, {
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

export default useTrendingQuery;
