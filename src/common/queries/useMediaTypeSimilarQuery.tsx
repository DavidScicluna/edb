import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';

export type UseMediaTypeSimilarQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseMediaTypeSimilarQueryProps<MT extends UseMediaTypeSimilarQueryMediaType> = {
	mediaType: MT;
	id: number;
};

export type UseMediaTypeSimilarQueryResponse<MT extends UseMediaTypeSimilarQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
>;

export type UseMediaTypeSimilarQueryOptions<MT extends UseMediaTypeSimilarQueryMediaType> = UseQueryOptions<
	UseMediaTypeSimilarQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UseMediaTypeSimilarQueryResult<MT extends UseMediaTypeSimilarQueryMediaType> = UseQueryResult<
	UseMediaTypeSimilarQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseMediaTypeSimilarQueryParams<MT extends UseMediaTypeSimilarQueryMediaType> = {
	props: UseMediaTypeSimilarQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseMediaTypeSimilarQueryOptions<MT>;
};

export const mediaTypeSimilarQueryToastID = memoize(
	<MT extends UseMediaTypeSimilarQueryMediaType>({ mediaType, id }: UseMediaTypeSimilarQueryProps<MT>): string =>
		`ds-edb-${mediaType}-${id}-similar-query-toast`
);
export const mediaTypeSimilarQueryKey = memoize(
	<MT extends UseMediaTypeSimilarQueryMediaType>({ mediaType, id }: UseMediaTypeSimilarQueryProps<MT>): QueryKey => [
		`ds-edb-${mediaType}-${id}-similar-query`
	]
);

const useMediaTypeSimilarQuery = <MT extends UseMediaTypeSimilarQueryMediaType>({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeSimilarQueryParams<MT>): UseMediaTypeSimilarQueryResult<MT> => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(mediaTypeSimilarQueryToastID({ mediaType, id }));
	const [key, setKey] = useState<QueryKey>(mediaTypeSimilarQueryKey({ mediaType, id }));

	const client = useQueryClient();
	const query = useQuery<UseMediaTypeSimilarQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseMediaTypeSimilarQueryResponse<MT>>(`/${mediaType}/${id}/similar`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			enabled: String(options.enabled) ? options.enabled : !!id,
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
									`Unfortunately, something went wrong when trying to fetch similar ${formatMediaTypeLabel(
										{
											type: 'single',
											mediaType
										}
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
		const newToastID = mediaTypeSimilarQueryToastID({ mediaType, id });
		const newKey = mediaTypeSimilarQueryKey({ mediaType, id });

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

export default useMediaTypeSimilarQuery;
