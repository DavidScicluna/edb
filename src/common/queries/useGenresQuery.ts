import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { genresQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, Genres, MediaType, QueryError } from '../types';

export type UseGenresQueryProps = { mediaType: Exclude<MediaType, 'person' | 'company' | 'collection'> };

export type UseGenresQueryResponse = Genres;

export type UseGenresQueryOptions = UseQueryOptions<UseGenresQueryResponse, AxiosError<QueryError>>;

export type UseGenresQueryResult = UseQueryResult<UseGenresQueryResponse, AxiosError<QueryError>>;

type UseGenresQueryParams = {
	props: UseGenresQueryProps;
	config?: AxiosConfig;
	options?: UseGenresQueryOptions;
};

const useGenresQuery = ({
	props: { mediaType },
	config = {},
	options = {}
}: UseGenresQueryParams): UseGenresQueryResult => {
	// const toast = useToast();

	const key = genresQueryKey({ mediaType }) || [`${mediaType}_genres`];

	const client = useQueryClient();
	const query = useQuery<UseGenresQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axiosInstance.get<UseGenresQueryResponse>(`/genre/${mediaType}/list`, {
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

export default useGenresQuery;
