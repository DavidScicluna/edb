import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { useWillUnmount } from 'rooks';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { genresQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, Genres, MediaType, QueryError } from '../types';
import { formatMediaTypeLabel } from '../utils';

export type UseGenresQueryProps = { mediaType: Exclude<MediaType, 'person' | 'company' | 'collection'> };

export type UseGenresQueryResponse = Genres;

export type UseGenresQueryOptions = UseQueryOptions<UseGenresQueryResponse, AxiosError<QueryError>>;

export type UseGenresQueryResult = UseQueryResult<UseGenresQueryResponse, AxiosError<QueryError>>;

type UseGenresQueryParams = {
	props: UseGenresQueryProps;
	config?: AxiosConfig;
	options?: UseGenresQueryOptions;
};

const toastID = 'ds-edb-use-genres-query-toast';

const useGenresQuery = ({
	props: { mediaType },
	config = {},
	options = {}
}: UseGenresQueryParams): UseGenresQueryResult => {
	const toast = useToast();

	const key = genresQueryKey({ mediaType });

	const client = useQueryClient();
	const query = useQuery<UseGenresQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseGenresQueryResponse>(`/genre/${mediaType}/list`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			onError: (error) => {
				console.error(error.toJSON());

				const { status_code, status_message } = error.response?.data || {};

				if (!toast.isActive(toastID)) {
					toast({
						id: toastID,
						duration: convertDurationToMS(),
						position: 'bottom-left',
						render: () => (
							<Alert
								duration={12.5}
								description={compact([
									status_code ? `${status_code}.` : null,
									`Unfortunately, something went wrong when trying to fetch ${formatMediaTypeLabel({
										type: 'single',
										mediaType
									})} genres.`,
									status_message ? `(${status_message})` : null
								]).join(' ')}
								status='error'
								onClose={() => toast.close(toastID)}
							/>
						)
					});
				}

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
