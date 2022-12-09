import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { videosQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Videos } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';

export type UseVideosQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseVideosQueryProps = { mediaType: UseVideosQueryMediaType; id: number };

export type UseVideosQueryResponse = Videos;

export type UseVideosQueryOptions = UseQueryOptions<UseVideosQueryResponse, AxiosError<QueryError>>;

export type UseVideosQueryResult = UseQueryResult<UseVideosQueryResponse, AxiosError<QueryError>>;

type UseVideosQueryParams = {
	props: UseVideosQueryProps;
	config?: AxiosConfig;
	options?: UseVideosQueryOptions;
};

const toastID = 'ds-edb-use-videos-query-toast';

const useVideosQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseVideosQueryParams): UseVideosQueryResult => {
	const toast = useToast();

	const key = videosQueryKey({ mediaType, id });

	const client = useQueryClient();
	const query = useQuery<UseVideosQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseVideosQueryResponse>(`/${mediaType}/${id}/videos`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			enabled: options.enabled || !!id,
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
									})} videos.`,
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

export default useVideosQuery;
