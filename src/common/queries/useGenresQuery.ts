import { useConst } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { genresQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Genres, MediaType, QueryError } from '../types';

export type UseGenresQueryProps = { mediaType: Exclude<MediaType, 'person' | 'company' | 'collection'> };

export type UseGenresQueryOptions = UseQueryOptions<Genres, AxiosError<QueryError>>;

export type UseGenresQueryResult = UseQueryResult<Genres, AxiosError<QueryError>>;

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
	const controller = new AbortController();

	// const toast = useToast();

	const key = useConst<QueryKey>(genresQueryKey({ mediaType }));

	const query = useQuery<Genres, AxiosError<QueryError>>(
		key,
		async () => {
			const { data } = await axiosInstance.get<Genres>(`/genre/${mediaType}/list`, {
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

export default useGenresQuery;
