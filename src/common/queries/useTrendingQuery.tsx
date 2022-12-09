import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { useWillUnmount } from 'rooks';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { trendingQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';

export type UseTrendingQueryMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type UseTrendingQueryProps<MT extends UseTrendingQueryMediaType> = {
	mediaType: MT;
	time: 'day' | 'week';
};

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
	props: UseTrendingQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseTrendingQueryOptions<MT>;
};

const toastID = 'ds-edb-use-trending-query-toast';

const useTrendingQuery = <MT extends UseTrendingQueryMediaType>({
	props: { mediaType, time },
	config = {},
	options = {}
}: UseTrendingQueryParams<MT>): UseTrendingQueryResult<MT> => {
	const toast = useToast();

	const key = trendingQueryKey({ mediaType, time });

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

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useTrendingQuery;
