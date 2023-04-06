import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact, memoize } from 'lodash';
import { useWillUnmount } from 'rooks';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTVShow } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';

const { convertDurationToMS } = utils;

export type UseTrendingQueryMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type UseTrendingQueryProps<MT extends UseTrendingQueryMediaType> = {
	mediaType: MT;
	time: 'day' | 'week';
};

export type UseTrendingQueryResponse<MT extends UseTrendingQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTVShow[]
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
	props: UseTrendingQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseTrendingQueryOptions<MT>;
};

export const trendingQueryToastID = memoize(
	<MT extends UseTrendingQueryMediaType>({ mediaType, time }: UseTrendingQueryProps<MT>): string =>
		`ds-edb-trending-${time}-${mediaType}-query-toast`
);
export const trendingQueryKey = memoize(
	<MT extends UseTrendingQueryMediaType>({ mediaType, time }: UseTrendingQueryProps<MT>): QueryKey => [
		`ds-edb-trending-${time}-${mediaType}-query`
	]
);

const useTrendingQuery = <MT extends UseTrendingQueryMediaType>({
	props: { mediaType, time },
	config = {},
	options = {}
}: UseTrendingQueryParams<MT>): UseTrendingQueryResult<MT> => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(trendingQueryToastID({ mediaType, time }));
	const [key, setKey] = useState<QueryKey>(trendingQueryKey({ mediaType, time }));

	const client = useQueryClient();
	const query = useQuery<UseTrendingQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseTrendingQueryResponse<MT>>(`/trending/${mediaType}/${time}`, {
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
									`Unfortunately, something went wrong when trying to fetch trending ${formatMediaTypeLabel(
										{ type: 'multiple', mediaType }
									)}.`,
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
		const newToastID = trendingQueryToastID({ mediaType, time });
		const newKey = trendingQueryKey({ mediaType, time });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [mediaType, time]);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useTrendingQuery;
