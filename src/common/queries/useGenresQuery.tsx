import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact, memoize } from 'lodash';
import { useWillUnmount } from 'rooks';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, Genres, MediaType, QueryError } from '../types';
import { formatMediaTypeLabel } from '../utils';

const { convertDurationToMS } = utils;

export type UseGenresQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseGenresQueryProps = { mediaType: UseGenresQueryMediaType };

export type UseGenresQueryResponse = Genres;

export type UseGenresQueryOptions = UseQueryOptions<UseGenresQueryResponse, AxiosError<QueryError>>;

export type UseGenresQueryResult = UseQueryResult<UseGenresQueryResponse, AxiosError<QueryError>>;

type UseGenresQueryParams = {
	props: UseGenresQueryProps;
	config?: AxiosConfig;
	options?: UseGenresQueryOptions;
};

export const genresQueryToastID = memoize(
	({ mediaType }: UseGenresQueryProps): string => `ds-edb-${mediaType}-genres-query-toast`
);
export const genresQueryKey = memoize(
	({ mediaType }: UseGenresQueryProps): QueryKey => [`ds-edb-${mediaType}-genres-query`]
);

const useGenresQuery = ({
	props: { mediaType },
	config = {},
	options = {}
}: UseGenresQueryParams): UseGenresQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(genresQueryToastID({ mediaType }));
	const [key, setKey] = useState<QueryKey>(genresQueryKey({ mediaType }));

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

	useUpdateEffect(() => {
		const newToastID = genresQueryToastID({ mediaType });
		const newKey = genresQueryKey({ mediaType });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [mediaType]);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useGenresQuery;
