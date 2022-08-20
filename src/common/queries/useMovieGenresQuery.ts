import { Undefinable } from '@davidscicluna/component-library';

import { UseQueryResult, UseQueryOptions, useQuery } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';

import { movieGenresQueryKey } from '../keys';
import axiosInstance from '../scripts/axios';
import { AxiosConfig, Genres, QueryError } from '../types';

export type UseMovieGenresQueryOptions = UseQueryOptions<Genres, AxiosError<QueryError>>;

export type UseMovieGenresQueryResult = UseQueryResult<Genres, AxiosError<QueryError>>;

type UseMovieGenresQueryProps = Undefinable<{
	config?: AxiosConfig;
	options?: UseMovieGenresQueryOptions;
}>;

const useMovieGenresQuery = ({
	config = {},
	options = {}
}: UseMovieGenresQueryProps = {}): UseMovieGenresQueryResult => {
	const source = axios.CancelToken.source();

	// const toast = useToast();

	const query = useQuery<Genres, AxiosError<QueryError>>(
		movieGenresQueryKey,
		async () => {
			const { data } = await axiosInstance.get<Genres>('/genre/movie/list', {
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

export default useMovieGenresQuery;
