import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Videos } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';

export type UseMediaTypeVideosQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseMediaTypeVideosQueryProps = { mediaType: UseMediaTypeVideosQueryMediaType; id: number };

export type UseMediaTypeVideosQueryResponse = Videos;

export type UseMediaTypeVideosQueryOptions = UseQueryOptions<UseMediaTypeVideosQueryResponse, AxiosError<QueryError>>;

export type UseMediaTypeVideosQueryResult = UseQueryResult<UseMediaTypeVideosQueryResponse, AxiosError<QueryError>>;

type UseMediaTypeVideosQueryParams = {
	props: UseMediaTypeVideosQueryProps;
	config?: AxiosConfig;
	options?: UseMediaTypeVideosQueryOptions;
};

export const mediaTypeVideosQueryToastID = memoize(
	({ mediaType, id }: UseMediaTypeVideosQueryProps): string => `ds-edb-${mediaType}-${id}-videos-query-toast`
);
export const mediaTypeVideosQueryKey = memoize(
	({ mediaType, id }: UseMediaTypeVideosQueryProps): QueryKey => [`ds-edb-${mediaType}-${id}-videos-query`]
);

const useMediaTypeVideosQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeVideosQueryParams): UseMediaTypeVideosQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(mediaTypeVideosQueryToastID({ mediaType, id }));
	const [key, setKey] = useState<QueryKey>(mediaTypeVideosQueryKey({ mediaType, id }));

	const client = useQueryClient();
	const query = useQuery<UseMediaTypeVideosQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseMediaTypeVideosQueryResponse>(`/${mediaType}/${id}/videos`, {
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

	useUpdateEffect(() => {
		const newToastID = mediaTypeVideosQueryToastID({ mediaType, id });
		const newKey = mediaTypeVideosQueryKey({ mediaType, id });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [mediaType, id]);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useMediaTypeVideosQuery;
