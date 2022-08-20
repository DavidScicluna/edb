import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQuery } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { tvShowGenresQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Genres, QueryError } from '../types';

export type UseTVShowGenresQueryOptions = UseQueryOptions<Genres, AxiosError<QueryError>>;

export type UseTVShowGenresQueryResult = UseQueryResult<Genres, AxiosError<QueryError>>;

type UseTVShowGenresQueryProps = Undefinable<{
	config?: AxiosConfig;
	options?: UseTVShowGenresQueryOptions;
}>;

const useTVShowGenresQuery = ({
	config = {},
	options = {}
}: UseTVShowGenresQueryProps = {}): UseTVShowGenresQueryResult => {
	const source = axios.CancelToken.source();

	// const toast = useToast();

	const query = useQuery<Genres, AxiosError<QueryError>>(
		tvShowGenresQueryKey,
		async () => {
			const { data } = await axiosInstance.get<Genres>('/genre/tv/list', {
				...config,
				cancelToken: source.token
			});
			return data;
		},
		{
			...options,
			onError: (error) => {
				console.error(error.toJSON());

				// TODO: ADD Toast
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

export default useTVShowGenresQuery;
